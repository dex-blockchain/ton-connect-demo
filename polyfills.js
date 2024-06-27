import {Buffer} from 'buffer';


if (window && !window.Buffer) {
  window.Buffer = Buffer;
}
