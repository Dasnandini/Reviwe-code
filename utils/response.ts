import { NextResponse } from "next/server";

export const successResponse = (
  message: string,
  data: unknown = null,
  statusCode = 200
) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: statusCode }
  );
};

export const errorResponse = (
  message: string,
  errors: unknown = null,
  statusCode = 400
) => {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status: statusCode }
  );
};