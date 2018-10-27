import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-pssword',
  templateUrl: './forget-pssword.component.html',
  styleUrls: ['./forget-pssword.component.css']
})
export class ForgetPsswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sendEmail() {
    alert('Email with instruction was sended to you');
  }
}
