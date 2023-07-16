import { ApplicationRef, Component, OnInit } from '@angular/core';
import { PushServiceService } from '../services/push-service.service';
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  mensajes: OSNotification[] = [];

  constructor(private pushServiceService: PushServiceService,
    private applicationRef: ApplicationRef) {}

  ngOnInit(): void {
    this.pushServiceService.pushListener.subscribe( noti => {
      this.mensajes.unshift(noti);
      this.applicationRef.tick(); //este metodo le dice a angular
    //que haga de nuevo el ciclo de detencion de cambios
    });

  }

  async ionViewWillEnter(){
    console.log('Messages is charging...')
    this.mensajes = await this.pushServiceService.getMessages();
  }

}
