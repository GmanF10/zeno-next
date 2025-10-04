# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |

## Reporting a Vulnerability

**DO NOT** open public issues for security vulnerabilities.

Email: [prod]@[hasyme.com]
Response time: 24 hours

Or use GitHub's private vulnerability reporting:
Repository → Security → Advisories → New draft

## Known Attack Vectors

1. 1e308 overflow
2. Negative cost exploitation
3. Type coercion
4. Injection (userId, noteId)
5. Race conditions
6. Denial of wallet

See `/docs/EXPLOITS.md` for details and mitigations.

## Bug Bounty

Novel exploits that bypass all 6 hardening vectors: Recognition in README + priority fix.
