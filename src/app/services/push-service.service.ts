import { EventEmitter, Injectable } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { OpenedEvent } from 'onesignal-cordova-plugin/dist/models/NotificationOpened';
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PushServiceService{

  public mensajes: OSNotification[] = [];

  pushListener = new EventEmitter<OSNotification>();


  constructor(
    private storage: Storage
  ) {
   // this.loadMessages();
  }

  OneSignalInit(): void {
    const self = this;
    // Uncomment to set OneSignal device logging to VERBOSE
    // OneSignal.setLogLevel(6, 0);

    // NOTE: Update the setAppId value below with your OneSignal AppId.
    OneSignal.setAppId('a4b26dc6-994c-46f6-8f74-1a76b2fc87e4');
    OneSignal.setNotificationOpenedHandler(function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      console.log('rese para que funcione xD')
       const data:OpenedEvent = jsonData;
        self.getNotification(data.notification);


    });

    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log('User accepted notifications: ' + accepted);
    });
  }

  async getNotification(notification: OSNotification) {

    await this.loadMessages();


    const existPush = this.mensajes?.find( mensaje => mensaje.androidNotificationId === notification.androidNotificationId)

    if(existPush){
      return;
    }

    this.mensajes.unshift(notification);
    this.pushListener.emit(notification);

    this.saveMessages();
  }

  async getMessages() {
    await this.loadMessages();
    return [...this.mensajes];
  }


  async saveMessages(){
    console.log('entro en save2')
   await this.storage.set('mensajes', this.mensajes)
  }

  async loadMessages() {
    this.mensajes = await this.storage?.get('mensajes') ?? [];
  }
}
