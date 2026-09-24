# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x     | ✅ Yes    |

## Reporting a Vulnerability

**Please do NOT open a public GitHub issue for security vulnerabilities.**

Report vulnerabilities via email to: `security@darktracex.com`

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact assessment
- (Optional) Suggested fix

We will respond within 48 hours and aim to remediate critical issues within 7 days.

---

## Content Security Policy (CSP)

```
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: blob:;
connect-src 'self';
frame-ancestors 'none';
```

## Security Headers

All responses include:

| Header | Value |
|--------|-------|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

## Input Validation

All contact form inputs are:
1. Validated client-side (regex, length checks)
2. Validated server-side via Next.js Server Actions
3. Sanitized before any processing
4. Never stored without explicit consent

## No Real Malware Policy

DarkTraceX **strictly prohibits**:
- Hosting real malware samples
- Making connections to C2 infrastructure
- Executing actual shellcode
- Performing real system modifications

All simulations are JavaScript animations for educational purposes only.

## Dependency Security

We regularly audit dependencies with `npm audit` and update packages with known vulnerabilities via Dependabot.

---

*Last updated: 2024*
