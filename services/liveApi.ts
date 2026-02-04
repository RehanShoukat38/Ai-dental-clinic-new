
import { GoogleGenAI, Modality, Blob, LiveServerMessage } from '@google/genai';
import { CLINIC_INFO } from '../constants';

// Manual implementation of encode/decode
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

export class LiveVoiceAgent {
  private inputAudioContext?: AudioContext;
  private outputAudioContext?: AudioContext;
  private nextStartTime: number = 0;
  private sources: Set<AudioBufferSourceNode> = new Set();
  private stream?: MediaStream;
  private sessionPromise?: Promise<any>;
  private currentInputTranscription: string = '';
  private currentOutputTranscription: string = '';

  constructor() {}

  async start(onTranscription: (text: string, isModel: boolean) => void, onError: (err: any) => void) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = this.inputAudioContext!.createMediaStreamSource(this.stream!);
            const scriptProcessor = this.inputAudioContext!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(this.inputAudioContext!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              this.currentOutputTranscription += message.serverContent.outputTranscription.text;
              onTranscription(this.currentOutputTranscription, true);
            }
            if (message.serverContent?.inputTranscription) {
              this.currentInputTranscription += message.serverContent.inputTranscription.text;
              onTranscription(this.currentInputTranscription, false);
            }
            if (message.serverContent?.turnComplete) {
              this.currentInputTranscription = '';
              this.currentOutputTranscription = '';
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext!.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), this.outputAudioContext!, 24000, 1);
              const source = this.outputAudioContext!.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(this.outputAudioContext!.destination);
              source.start(this.nextStartTime);
              this.nextStartTime += audioBuffer.duration;
              this.sources.add(source);
              source.onended = () => this.sources.delete(source);
            }

            if (message.serverContent?.interrupted) {
              this.sources.forEach(s => {
                try { s.stop(); } catch(e) {}
              });
              this.sources.clear();
              this.nextStartTime = 0;
            }
          },
          onerror: (e: any) => onError(e),
          onclose: () => console.log("Voice session closed"),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: `
            You are an AI dental assistant for the clinic “My Dentist.” 
            
            CORE VOICE RULES:
            - Provide 100% accurate information in a single turn. Never stop mid-sentence.
            - Answer directly using clinic data. Do not say "it might vary" or redirect to a phone call if the info is here.
            - When asked about timings, state the full opening and closing hours in one complete sentence.
            - On weekdays we are open from ${CLINIC_INFO.hours.weekdays}, on Saturdays from ${CLINIC_INFO.hours.saturday}, and Sundays are emergency only.
            
            PHONE NUMBER RULE:
            - When stating the phone number ${CLINIC_INFO.phone}, speak every single digit clearly and in full. 
            - Say: "plus one, five five five, one two three, four five six seven."
            
            GENERAL CONTENT:
            - Services: General Dentistry, Teeth Whitening, Dental Implants, Orthodontics, Pediatric Care, and Emergency Care.
            - Location: ${CLINIC_INFO.address}.
            - Only suggest calling ${CLINIC_INFO.phone} for emergencies or cases not covered by these standard details.
          `,
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        }
      });

      this.sessionPromise = sessionPromise;
      return true;
    } catch (err) {
      console.error("Voice Agent Failed:", err);
      return false;
    }
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.sessionPromise?.then(session => session.close());
    this.inputAudioContext?.close();
    this.outputAudioContext?.close();
  }
}
