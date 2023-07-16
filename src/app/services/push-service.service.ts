import { Injectable } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification';
import { General } from '../interfaces/general.interface';
import { OpenedEvent } from 'onesignal-cordova-plugin/dist/models/NotificationOpened';

@Injectable({
  providedIn: 'root'
})
export class PushServiceService {

  public mensajes: any[] = [
    {
      title: 'Titulo del push',
      body: 'Este es el body del push',
      date: new Date()
    }
  ]


  constructor() { }

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

  getNotification(notification: OSNotification) {
    if(this.mensajes.length <= 1){
      this.mensajes.unshift(notification);
      return;
    }

    const existPush = this.mensajes.find( mensaje => mensaje.androidNotificationId === notification.androidNotificationId)

    if(existPush){
      return;
    }

    this.mensajes.unshift(notification);

  }
}
