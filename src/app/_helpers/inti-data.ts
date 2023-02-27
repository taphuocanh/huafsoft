import { UserService } from './../_services/user.service';
import { Injectable } from '@angular/core';
@Injectable()
export class InitData {

  constructor(private userService: UserService) {
    console.log('Application initialized')
  }
}
