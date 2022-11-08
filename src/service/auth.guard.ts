// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthGuard as Guard } from '@nestjs/passport';

// @Injectable()
// export class AuthGuard extends Guard('jwt') {
//   getRequest(context: ExecutionContext): Request {
//     const ctx = GqlExecutionContext.create(context);
    
//     return ctx.getContext().req;
//   }
// }
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log("request",request)
    return true;
  }
}
