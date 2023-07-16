import { Component, OnInit } from '@angular/core';
import { PushServiceService } from './services/push-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private pushServiceService: PushServiceService
  ){}

  ngOnInit(): void {
    this.pushServiceService.OneSignalInit();
  }


}
