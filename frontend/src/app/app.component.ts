import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { Test, TestService } from './services/test-services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'frontend';

  testValue: Observable<Test> = this.service.getTest();

  constructor(private service: TestService) { }

}
