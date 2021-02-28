import React from 'react';
import NextHead from 'next/head';
import { GoogleFonts } from 'next-google-fonts';

export interface HeadProps {
  children?: React.ReactNode;
  title: string;
}

export const Head = ({ children, title }: HeadProps) => (
  <React.Fragment>
    <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      <title>{title}</title>

      <link rel="icon" href="/favicon.ico" />

      {children}
    </NextHead>
  </React.Fragment>
);
