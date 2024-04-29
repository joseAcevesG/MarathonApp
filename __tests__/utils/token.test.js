const jwt = require('jsonwebtoken');

// Utility functions to handle token generation and verification
const secret = 'your-secret-key'; // This should be kept secure

function generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, secret, { expiresIn });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('Token verification failed:', error);
        return false;
    }
}

// Test cases
describe('Token Operations', () => {
  // TC6: Successful Token Generation
    test('generates a token when all necessary data is provided', () => {
        const payload = { userId: 1, email: 'test@example.com' };
        const token = generateToken(payload);
        expect(token).toBeDefined();
        const verification = verifyToken(token);
        expect(verification).toMatchObject(payload);
    });

  // TC7: Valid Token Verification
    test('verifies a previously generated token correctly', () => {
        const payload = { userId: 2, email: 'test2@example.com' };
        const token = generateToken(payload);
        const verification = verifyToken(token);
        expect(verification).toMatchObject(payload);
    });

  // TC8: Failed Verification for Altered Token
    test('rejects an altered token', () => {
        let token = generateToken({ userId: 3 });
    // Simulating alteration of the token
        token = token.replace(/.$/, 'x');
        const verification = verifyToken(token);
        expect(verification).toBeFalsy();
    });

  // TC9: Token Expiration
    test('invalidates an expired token', done => {
        const shortLivedToken = generateToken({ userId: 4 }, '1s');
        setTimeout(() => {
            const verification = verifyToken(shortLivedToken);
            expect(verification).toBeFalsy();
            done();
        }, 2000); // wait 2 seconds for the token to expire
    });

  // TC10: Token Generation without Required Data
    test('handles generation without required data', () => {
        const token = generateToken({});
        expect(token).toBeDefined();
        const verification = verifyToken(token);
        expect(verification).toBeTruthy();
    });
});

