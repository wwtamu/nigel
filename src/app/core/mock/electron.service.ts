import { Subject } from 'rxjs';

class Channel {
  constructor(public name: string, public listener: (args: any, ...params: any[]) => void) { }
}

export class Message {
  channel: string;
  params?: any[];
}

export class MockElectronService {
  channelSource = new Subject<Message>();

  private channels: Channel[] = [];

  ipcRenderer = {
    on: (name: string, listener: (args: any, ...params: any[]) => void) => {
      this.channels.push(new Channel(name, listener));
    },
    once: (name: string, listener: (args: any, ...params: any[]) => void) => {
      this.channels.push(new Channel(name, listener));
    },
    send: (channel: string, args: string) => { },
    sendSync: (channel: string, args: string) => { }
  };

  constructor() {
    this.channelSource.subscribe(msg => {
      this.channels.find(channel => channel.name === msg.channel).listener({}, ...msg.params);
    });
  }
}
