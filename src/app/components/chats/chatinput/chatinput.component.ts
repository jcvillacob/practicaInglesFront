import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-chatinput',
  templateUrl: './chatinput.component.html',
  styleUrls: ['./chatinput.component.css']
})
export class ChatinputComponent {
  isRecording: boolean = false;
  mediaRecorder: any;
  audioChunks: any[] = [];
  audioBlob: Blob | null = null;
  audioUrl: string | null = null;
  currentAudio: HTMLAudioElement | null = null;
  text: string = '';


  constructor(private ngZone: NgZone) {

  }

  startRecording() {
    this.audioChunks = [];
    // Accede al micrófono
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        this.audioChunks.push(event.data);
      };

      // Cuando termine la grabación
      this.mediaRecorder.onstop = () => {
        this.ngZone.run(() => {
          this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.audioUrl = URL.createObjectURL(this.audioBlob);
        });
      };

      this.mediaRecorder.start();
      this.isRecording = true;
    });
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  playAudio() {
    if (this.audioUrl) {
      if (this.currentAudio) {
        // Si hay un audio reproduciéndose, lo detenemos
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio = null;
        // Y lo reproducimos nuevamente
        this.currentAudio = new Audio(this.audioUrl);
        this.currentAudio.play();
      } else {
        // Si no hay audio reproduciéndose, comenzamos a reproducir
        this.currentAudio = new Audio(this.audioUrl);
        this.currentAudio.play();
        this.currentAudio.onended = () => this.currentAudio = null;
      }
    }
  }


  sendMessage() {
    this.audioUrl = null;
  }


}
