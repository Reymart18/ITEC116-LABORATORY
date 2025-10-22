// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Register user
  async register(email: string, password: string) {
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      return { message: 'Email already registered' };
    }

    const hashed = await bcrypt.hash(password, 10);
    const verificationToken = randomBytes(32).toString('hex');

    const user = this.userRepository.create({
      email,
      password: hashed,
      verificationToken,
      isVerified: false,
    });

    await this.userRepository.save(user);
    await this.sendVerificationEmail(email, verificationToken);

    return { message: 'Registration successful! Check your email to verify.' };
  }

  // Send verification email
  async sendVerificationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'reymartomega08@gmail.com', // replace with your Gmail
        pass: 'qbra imhc jzys zasg',   // use an App Password (not your Gmail password!)
      },
    });

    const verificationLink = `http://localhost:3000/auth/verify?token=${token}`;

    await transporter.sendMail({
      from: '"Activity 2" <yourgmail@gmail.com>',
      to: email,
      subject: 'Verify Your Email',
      html: `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your account:</p>
        <a href="${verificationLink}">${verificationLink}</a>
      `,
    });
  }

  // Verify token
  async verifyEmail(token: string) {
    const user = await this.userRepository.findOne({ where: { verificationToken: token } });
    if (!user) {
      return { message: 'Invalid or expired token' };
    }

    user.isVerified = true;
    user.verificationToken = null;
    await this.userRepository.save(user);

    return { message: 'Email verified successfully! You can now log in.' };
  }

  // Login only if verified
  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return { message: 'Invalid credentials' };

    if (!user.isVerified) {
      return { message: 'Please verify your email before logging in.' };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return { message: 'Invalid credentials' };

    return { token: `fake-jwt-token-for-user-${user.id}` };
  }
}
