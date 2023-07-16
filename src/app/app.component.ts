import { Component, OnInit } from '@angular/core';
import { PushServiceService } from './services/push-service.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private pushServiceService: PushServiceService,
    private storage: Storage
  ) {

  }

  async ngOnInit() {
    await this.storage.create();
    this.pushServiceService.OneSignalInit();
  }
}
