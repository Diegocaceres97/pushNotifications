import { Component } from '@angular/core';
import { PushServiceService } from '../services/push-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public pushServiceService: PushServiceService) {}

}
