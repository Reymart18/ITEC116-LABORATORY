import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 🔹 Register a new user
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

    return { message: 'Registration successful! Check your Gmail to verify.' };
  }

  // 🔹 Send verification email
  async sendVerificationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'reymartomega08@gmail.com', // Gmail
        pass: 'lvql jzkd edmv untn', // App password
      },
    });

    const verificationLink = `http://localhost:3001/auth/verify?token=${token}`;

    await transporter.sendMail({
      from: '"Activity 5 Blog" <noreply@activity5.com>',
      to: email,
      subject: 'Verify your email for Activity 5 Blog',
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;border-radius:10px;background:#fff3f0">
          <h2 style="color:#FF6347">Email Verification</h2>
          <p>Click the button below to verify your account:</p>
          <a href="${verificationLink}" 
             style="background:#FF6347;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">Verify Email</a>
          <p>If you didn’t request this, ignore this email.</p>
        </div>
      `,
    });
  }

  // 🔹 Verify email link
  async verifyEmail(token: string) {
    const user = await this.userRepository.findOne({ where: { verificationToken: token } });
    if (!user) {
      return { message: 'Invalid or expired verification link' };
    }

    user.isVerified = true;
    user.verificationToken = null;
    await this.userRepository.save(user);

    return { message: 'Email verified successfully! You can now log in.' };
  }

  // 🔹 Login user and return a real JWT token
  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return { message: 'Invalid credentials' };

    if (!user.isVerified)
      return { message: 'Please verify your email before logging in.' };

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return { message: 'Invalid credentials' };

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { message: 'Login successful!', token };
  }
}
