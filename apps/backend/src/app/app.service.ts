import { Injectable } from '@nestjs/common';

import { environment } from "../environments/environment";

@Injectable()
export class AppService {
  getData(): { message: string, production: boolean } {
    return { message: 'Welcome to backend!', production: environment.production };
  }
}
