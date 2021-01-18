import { User } from './../../../core/domain/user/User.domain';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;

  @Output() pay: EventEmitter<User> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  onClickPay(user: User) {
    this.pay.emit(user);
  }
}
