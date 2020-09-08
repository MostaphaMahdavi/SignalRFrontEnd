import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages: Array<string> = [];

  title = 'ChatHubClient';
  messageTxt: string;
  hubConnection: HubConnection;

  ngOnInit() {

    this.hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:44342/chatHub")
      .build();


    this.hubConnection.on("ReceiveMessage", (message: string) => {
      this.messages.push(message);

    });

    this.hubConnection.start().catch((e) => {
      console.log(e);
    });

  }

  sendMessageToHub() {
       this.hubConnection.send("SendMessage", this.messageTxt);
       this.messageTxt='';
  }
}
