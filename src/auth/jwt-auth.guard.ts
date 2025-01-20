import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];  

    if (!token) {
      throw new UnauthorizedException('Unauthorized request: Token is missing');
    }

    try {
      // Verify and decode the token
      const decodedToken = this.jwtService.verify(token);  
      request.user = decodedToken;  // Attach the decoded token to the request (optional, for later use in controllers)
      return true;  // If token is valid, allow the request
    } catch (error) {
      // Handle expired token specifically
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      }
      // Handle any other JWT verification errors
      throw new UnauthorizedException('Unauthorized request: Token is invalid');
    }
  }
}
