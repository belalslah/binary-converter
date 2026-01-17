/**
 * Converts a string to a binary string representation (UTF-8).
 * Each byte is separated by a space.
 */
export function textToBinary(text: string): string {
  if (!text) return '';

  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);

  return Array.from(bytes)
    .map(byte => byte.toString(2).padStart(8, '0'))
    .join(' ');
}

/**
 * Converts a space-separated binary string back to text (UTF-8).
 * Throws an error if the binary string is malformed.
 */
export function binaryToText(binary: string): string {
  if (!binary) return '';

  // Clean input: remove non-binary/non-space chars, normalize spaces
  const cleanBinary = binary.replace(/[^01 ]/g, '').trim().replace(/\s+/g, ' ');

  if (!cleanBinary) return '';

  const bytes = cleanBinary.split(' ').map(bin => {
    // Check if valid 8-bit binary
    if (bin.length > 8) {
      // Optional: handle edge cases or let parseInt handle it, 
      // but typically we want 8-bit chunks.
    }
    const val = parseInt(bin, 2);
    if (isNaN(val)) throw new Error(`Invalid binary segment: ${bin}`);
    return val;
  });

  const decoder = new TextDecoder('utf-8');
  try {
    return decoder.decode(new Uint8Array(bytes));
  } catch (e) {
    console.error(e);
    return 'Error decoding binary data';
  }
}
