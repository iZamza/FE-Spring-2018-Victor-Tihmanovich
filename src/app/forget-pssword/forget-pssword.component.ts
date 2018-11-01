import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-pssword',
  templateUrl: './forget-pssword.component.html',
  styleUrls: ['./forget-pssword.component.css']
})
export class ForgetPsswordComponent implements OnInit {

  constructor(
    public translate: TranslateService) {
    translate.addLangs(['en', 'rus']);
    translate.setDefaultLang('en');
  }


  ngOnInit() {
  }

  sendEmail() {
    alert('Email with instruction was sended to you');
  }
}
