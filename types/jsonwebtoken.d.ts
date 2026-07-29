declare module "jsonwebtoken" {
  export type Secret = string;
  export type SignOptions = {
    expiresIn?: string | number;
  };

  export function sign(payload: string | object | Buffer, secretOrPrivateKey: Secret, options?: SignOptions): string;
  export function verify(token: string, secretOrPublicKey: Secret): string | object;

  const jwt: {
    sign: typeof sign;
    verify: typeof verify;
  };

  export default jwt;
}
