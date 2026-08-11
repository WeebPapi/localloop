# ADR-003 - Advertiser and host are business capabilities

**Status:** Accepted
**Date:** 2026-08-11
**Owner:** Aleksandre Kapanadze

## Context

A local business can run its own campaign while also participating as a host in
another business's campaign. Modeling advertiser and host as fixed signup types
would prevent that real-world relationship.

## Decision

Only customer and business are account types. Advertiser and host are derived
business capabilities. Product navigation distinguishes a demo persona switcher
from a business workspace switcher.

## Consequences

- Domain and UI work must support a business holding both capabilities.
- Signup, labels, and copy must not imply an irreversible business role choice.
- Route guards should enforce a selected workspace's actual capability.
