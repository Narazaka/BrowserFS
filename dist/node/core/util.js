var path = require('path');
exports.isIE = typeof navigator !== "undefined" && (/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) != null || navigator.userAgent.indexOf('Trident') !== -1);
exports.isWebWorker = typeof window === "undefined";
function mkdirpSync(p, mode, fs) {
    var parent = path.dirname(p);
    if (!fs.existsSync(parent)) {
        mkdirpSync(parent, mode, fs);
    }
    else {
        fs.mkdirSync(p, mode);
    }
}
exports.mkdirpSync = mkdirpSync;
function buffer2ArrayBuffer(buff) {
    var u8 = buffer2Uint8array(buff), u8offset = u8.byteOffset, u8Len = u8.byteLength;
    if (u8offset === 0 && u8Len === u8.buffer.byteLength) {
        return u8.buffer;
    }
    else {
        return u8.buffer.slice(u8offset, u8offset + u8Len);
    }
}
exports.buffer2ArrayBuffer = buffer2ArrayBuffer;
function buffer2Uint8array(buff) {
    if (buff['toUint8Array']) {
        return buff.toUint8Array();
    }
    else if (buff instanceof Uint8Array) {
        return buff;
    }
    else {
        return new Uint8Array(buff);
    }
}
exports.buffer2Uint8array = buffer2Uint8array;
function buffer2Arrayish(buff) {
    if (buff.length === 0 || typeof (buff[0]) === 'number') {
        return buff;
    }
    else if (typeof (ArrayBuffer) !== 'undefined') {
        return buffer2Uint8array(buff);
    }
    else {
        return buff.toJSON().data;
    }
}
exports.buffer2Arrayish = buffer2Arrayish;
function arrayish2Buffer(arr) {
    if (arr instanceof Uint8Array) {
        return uint8Array2Buffer(arr);
    }
    else if (arr instanceof Buffer) {
        return arr;
    }
    else {
        return new Buffer(arr);
    }
}
exports.arrayish2Buffer = arrayish2Buffer;
function uint8Array2Buffer(u8) {
    if (u8.byteOffset === 0 && u8.byteLength === u8.buffer.byteLength) {
        return arrayBuffer2Buffer(u8);
    }
    else {
        return new Buffer(u8);
    }
}
exports.uint8Array2Buffer = uint8Array2Buffer;
function arrayBuffer2Buffer(ab) {
    try {
        return new Buffer(ab);
    }
    catch (e) {
        return new Buffer(new Uint8Array(ab));
    }
}
exports.arrayBuffer2Buffer = arrayBuffer2Buffer;
if (typeof (ArrayBuffer) !== 'undefined' && typeof (Uint8Array) !== 'undefined') {
    if (!Uint8Array.prototype['slice']) {
        Uint8Array.prototype.slice = function (start, end) {
            if (start === void 0) { start = 0; }
            if (end === void 0) { end = this.length; }
            var self = this;
            if (start < 0) {
                start = this.length + start;
                if (start < 0) {
                    start = 0;
                }
            }
            if (end < 0) {
                end = this.length + end;
                if (end < 0) {
                    end = 0;
                }
            }
            if (end < start) {
                end = start;
            }
            return new Uint8Array(self.buffer, self.byteOffset + start, end - start);
        };
    }
}
function copyingSlice(buff, start, end) {
    if (start === void 0) { start = 0; }
    if (end === void 0) { end = buff.length; }
    if (start < 0 || end < 0 || end > buff.length || start > end) {
        throw new TypeError("Invalid slice bounds on buffer of length " + buff.length + ": [" + start + ", " + end + "]");
    }
    if (buff.length === 0) {
        return new Buffer(0);
    }
    else if (typeof (ArrayBuffer) !== 'undefined') {
        var u8 = buffer2Uint8array(buff), s0 = buff.readUInt8(0), newS0 = (s0 + 1) % 0xFF;
        buff.writeUInt8(newS0, 0);
        if (u8[0] === newS0) {
            u8[0] = s0;
            return uint8Array2Buffer(u8.slice(start, end));
        }
        else {
            buff.writeUInt8(s0, 0);
            return uint8Array2Buffer(u8.subarray(start, end));
        }
    }
    else {
        var buffSlice = new Buffer(end - start);
        buff.copy(buffSlice, 0, start, end);
        return buffSlice;
    }
}
exports.copyingSlice = copyingSlice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL3V0aWwudHMiXSwibmFtZXMiOlsibWtkaXJwU3luYyIsImJ1ZmZlcjJBcnJheUJ1ZmZlciIsImJ1ZmZlcjJVaW50OGFycmF5IiwiYnVmZmVyMkFycmF5aXNoIiwiYXJyYXlpc2gyQnVmZmVyIiwidWludDhBcnJheTJCdWZmZXIiLCJhcnJheUJ1ZmZlcjJCdWZmZXIiLCJjb3B5aW5nU2xpY2UiXSwibWFwcGluZ3MiOiJBQUlBLElBQU8sSUFBSSxXQUFXLE1BQU0sQ0FBQyxDQUFDO0FBTW5CLFlBQUksR0FBWSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBS3pLLG1CQUFXLEdBQVksT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDO0FBVWhFLG9CQUEyQixDQUFTLEVBQUUsSUFBWSxFQUFFLEVBQWM7SUFDaEVBLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQzdCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMzQkEsVUFBVUEsQ0FBQ0EsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFDL0JBLENBQUNBO0lBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ05BLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO0lBQ3hCQSxDQUFDQTtBQUNIQSxDQUFDQTtBQVBlLGtCQUFVLGFB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LElBQUlBLENBQUNBLE1BQU1BLFdBQU1BLEtBQUtBLFVBQUtBLEdBQUdBLE1BQUdBLENBQUNBLENBQUNBO0lBQ3JHQSxDQUFDQTtJQUNEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUV0QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLE9BQU1BLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO1FBQy9DQSxJQUFJQSxFQUFFQSxHQUFHQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLEVBQzlCQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUN0QkEsS0FBS0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFMUJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQzFCQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVwQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDWEEsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqREEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFTkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkJBLE1BQU1BLENBQUNBLGlCQUFpQkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDcERBLENBQUNBO0lBQ0hBLENBQUNBO0lBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ05BLElBQUlBLFNBQVNBLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLEdBQUdBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBO1FBQ3hDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNwQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7SUFDbkJBLENBQUNBO0FBQ0hBLENBQUNBO0FBM0JlLG9CQUFZLGVBMkIzQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBHcmFiIGJhZyBvZiB1dGlsaXR5IGZ1bmN0aW9ucyB1c2VkIGFjcm9zcyB0aGUgY29kZS5cbiAqL1xuaW1wb3J0IHtGaWxlU3lzdGVtfSBmcm9tICcuL2ZpbGVfc3lzdGVtJztcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBmb3IgYW55IElFIHZlcnNpb24sIGluY2x1ZGluZyBJRTExIHdoaWNoIHJlbW92ZWQgTVNJRSBmcm9tIHRoZVxuICogdXNlckFnZW50IHN0cmluZy5cbiAqL1xuZXhwb3J0IHZhciBpc0lFOiBib29sZWFuID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJiAoLyhtc2llKSAoW1xcdy5dKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSAhPSBudWxsIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignVHJpZGVudCcpICE9PSAtMSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLlxuICovXG5leHBvcnQgdmFyIGlzV2ViV29ya2VyOiBib29sZWFuID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBBcnJheWlzaDxUPiB7XG4gIFtpZHg6IG51bWJlcl06IFQ7XG4gIGxlbmd0aDogbnVtYmVyO1xufVxuXG4vKipcbiAqIFN5bmNocm9ub3VzIHJlY3Vyc2l2ZSBtYWtlZGlyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWtkaXJwU3luYyhwOiBzdHJpbmcsIG1vZGU6IG51bWJlciwgZnM6IEZpbGVTeXN0ZW0pOiB2b2lkIHtcbiAgbGV0IHBhcmVudCA9IHBhdGguZGlybmFtZShwKTtcbiAgaWYgKCFmcy5leGlzdHNTeW5jKHBhcmVudCkpIHtcbiAgICBta2RpcnBTeW5jKHBhcmVudCwgbW9kZSwgZnMpO1xuICB9IGVsc2Uge1xuICAgIGZzLm1rZGlyU3luYyhwLCBtb2RlKTtcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgYnVmZmVyIGludG8gYW4gYXJyYXkgYnVmZmVyLiBBdHRlbXB0cyB0byBkbyBzbyBpbiBhXG4gKiB6ZXJvLWNvcHkgbWFubmVyLCBlLmcuIHRoZSBhcnJheSByZWZlcmVuY2VzIHRoZSBzYW1lIG1lbW9yeS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlcjJBcnJheUJ1ZmZlcihidWZmOiBCdWZmZXIpOiBBcnJheUJ1ZmZlciB7XG4gIHZhciB1OCA9IGJ1ZmZlcjJVaW50OGFycmF5KGJ1ZmYpLFxuICAgIHU4b2Zmc2V0ID0gdTguYnl0ZU9mZnNldCxcbiAgICB1OExlbiA9IHU4LmJ5dGVMZW5ndGg7XG4gIGlmICh1OG9mZnNldCA9PT0gMCAmJiB1OExlbiA9PT0gdTguYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICByZXR1cm4gdTguYnVmZmVyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1OC5idWZmZXIuc2xpY2UodThvZmZzZXQsIHU4b2Zmc2V0ICsgdThMZW4pXG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIGJ1ZmZlciBpbnRvIGEgVWludDhBcnJheS4gQXR0ZW1wdHMgdG8gZG8gc28gaW4gYVxuICogemVyby1jb3B5IG1hbm5lciwgZS5nLiB0aGUgYXJyYXkgcmVmZXJlbmNlcyB0aGUgc2FtZSBtZW1vcnkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWZmZXIyVWludDhhcnJheShidWZmOiBCdWZmZXIpOiBVaW50OEFycmF5IHtcbiAgaWYgKGJ1ZmZbJ3RvVWludDhBcnJheSddKSB7XG4gICAgcmV0dXJuICg8YW55PiBidWZmKS50b1VpbnQ4QXJyYXkoKTtcbiAgfSBlbHNlIGlmIChidWZmIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgIC8vIE5vZGUgdjQuMCBidWZmZXJzICphcmUqIFVpbnQ4QXJyYXlzLlxuICAgIHJldHVybiA8YW55PiBidWZmO1xuICB9IGVsc2Uge1xuICAgIC8vIFVpbnQ4QXJyYXlzIGNhbiBiZSBjb25zdHJ1Y3RlZCBmcm9tIGFycmF5aXNoIG51bWJlcnMuXG4gICAgLy8gQXQgdGhpcyBwb2ludCwgd2UgYXNzdW1lIHRoaXMgaXNuJ3QgYSBCRlMgYXJyYXkuXG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ1ZmYpO1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGdpdmVuIGJ1ZmZlciBpbnRvIGEgVWludDggYXJyYXlpc2ggZm9ybS4gQXR0ZW1wdHNcbiAqIHRvIGJlIHplcm8tY29weS5cbiAqXG4gKiBSZXF1aXJlZCBmb3IgQnJvd3NlckZTIGJ1ZmZlcnMsIHdoaWNoIGRvIG5vdCBzdXBwb3J0IGluZGV4aW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyMkFycmF5aXNoKGJ1ZmY6IEJ1ZmZlcik6IEFycmF5aXNoPG51bWJlcj4ge1xuICBpZiAoYnVmZi5sZW5ndGggPT09IDAgfHwgdHlwZW9mKGJ1ZmZbMF0pID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBidWZmO1xuICB9IGVsc2UgaWYgKHR5cGVvZihBcnJheUJ1ZmZlcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGJ1ZmZlcjJVaW50OGFycmF5KGJ1ZmYpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBidWZmLnRvSlNPTigpLmRhdGE7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgZ2l2ZW4gYXJyYXlpc2ggb2JqZWN0IGludG8gYSBCdWZmZXIuIEF0dGVtcHRzIHRvXG4gKiBiZSB6ZXJvLWNvcHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcnJheWlzaDJCdWZmZXIoYXJyOiBBcnJheWlzaDxudW1iZXI+KTogQnVmZmVyIHtcbiAgaWYgKGFyciBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICByZXR1cm4gdWludDhBcnJheTJCdWZmZXIoYXJyKTtcbiAgfSBlbHNlIGlmIChhcnIgaW5zdGFuY2VvZiBCdWZmZXIpIHtcbiAgICByZXR1cm4gYXJyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKDxudW1iZXJbXT4gYXJyKTtcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiBVaW50OEFycmF5IGludG8gYSBCdWZmZXIuIEF0dGVtcHRzIHRvIGJlIHplcm8tY29weS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVpbnQ4QXJyYXkyQnVmZmVyKHU4OiBVaW50OEFycmF5KTogQnVmZmVyIHtcbiAgaWYgKHU4LmJ5dGVPZmZzZXQgPT09IDAgJiYgdTguYnl0ZUxlbmd0aCA9PT0gdTguYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICByZXR1cm4gYXJyYXlCdWZmZXIyQnVmZmVyKHU4KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcih1OCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgZ2l2ZW4gYXJyYXkgYnVmZmVyIGludG8gYSBCdWZmZXIuIEF0dGVtcHRzIHRvIGJlXG4gKiB6ZXJvLWNvcHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUJ1ZmZlcjJCdWZmZXIoYWI6IEFycmF5QnVmZmVyKTogQnVmZmVyIHtcbiAgdHJ5IHtcbiAgICAvLyBXb3JrcyBpbiBCRlMgYW5kIE5vZGUgdjQuMi5cbiAgICByZXR1cm4gbmV3IEJ1ZmZlcig8YW55PiBhYik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBJIGJlbGlldmUgdGhpcyBjb3BpZXMsIGJ1dCB0aGVyZSdzIG5vIGF2b2lkaW5nIGl0IGluIE5vZGUgPCB2MC4xMlxuICAgIHJldHVybiBuZXcgQnVmZmVyKG5ldyBVaW50OEFycmF5KGFiKSk7XG4gIH1cbn1cblxuLy8gUG9seWZpbGwgZm9yIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNsaWNlLlxuLy8gU2FmYXJpIGFuZCBzb21lIG90aGVyIGJyb3dzZXJzIGRvIG5vdCBkZWZpbmUgaXQuXG5pZiAodHlwZW9mKEFycmF5QnVmZmVyKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mKFVpbnQ4QXJyYXkpICE9PSAndW5kZWZpbmVkJykge1xuICBpZiAoIVVpbnQ4QXJyYXkucHJvdG90eXBlWydzbGljZSddKSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbihzdGFydDogbnVtYmVyID0gMCwgZW5kOiBudW1iZXIgPSB0aGlzLmxlbmd0aCk6IFVpbnQ4QXJyYXkge1xuICAgICAgbGV0IHNlbGY6IFVpbnQ4QXJyYXkgPSB0aGlzO1xuICAgICAgaWYgKHN0YXJ0IDwgMCkge1xuICAgICAgICBzdGFydCA9IHRoaXMubGVuZ3RoICsgc3RhcnQ7XG4gICAgICAgIGlmIChzdGFydCA8IDApIHtcbiAgICAgICAgICBzdGFydCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChlbmQgPCAwKSB7XG4gICAgICAgIGVuZCA9IHRoaXMubGVuZ3RoICsgZW5kO1xuICAgICAgICBpZiAoZW5kIDwgMCkge1xuICAgICAgICAgIGVuZCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChlbmQgPCBzdGFydCkge1xuICAgICAgICBlbmQgPSBzdGFydDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShzZWxmLmJ1ZmZlciwgc2VsZi5ieXRlT2Zmc2V0ICsgc3RhcnQsIGVuZCAtIHN0YXJ0KTtcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogQ29waWVzIGEgc2xpY2Ugb2YgdGhlIGdpdmVuIGJ1ZmZlclxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weWluZ1NsaWNlKGJ1ZmY6IEJ1ZmZlciwgc3RhcnQ6IG51bWJlciA9IDAsIGVuZCA9IGJ1ZmYubGVuZ3RoKTogQnVmZmVyIHtcbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPCAwIHx8IGVuZCA+IGJ1ZmYubGVuZ3RoIHx8IHN0YXJ0ID4gZW5kKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBzbGljZSBib3VuZHMgb24gYnVmZmVyIG9mIGxlbmd0aCAke2J1ZmYubGVuZ3RofTogWyR7c3RhcnR9LCAke2VuZH1dYCk7XG4gIH1cbiAgaWYgKGJ1ZmYubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gQXZvaWQgczAgY29ybmVyIGNhc2UgaW4gQXJyYXlCdWZmZXIgY2FzZS5cbiAgICByZXR1cm4gbmV3IEJ1ZmZlcigwKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YoQXJyYXlCdWZmZXIpICE9PSAndW5kZWZpbmVkJykge1xuICAgIHZhciB1OCA9IGJ1ZmZlcjJVaW50OGFycmF5KGJ1ZmYpLFxuICAgICAgczAgPSBidWZmLnJlYWRVSW50OCgwKSxcbiAgICAgIG5ld1MwID0gKHMwICsgMSkgJSAweEZGO1xuXG4gICAgYnVmZi53cml0ZVVJbnQ4KG5ld1MwLCAwKTtcbiAgICBpZiAodThbMF0gPT09IG5ld1MwKSB7XG4gICAgICAvLyBTYW1lIG1lbW9yeS4gUmV2ZXJ0ICYgY29weS5cbiAgICAgIHU4WzBdID0gczA7XG4gICAgICByZXR1cm4gdWludDhBcnJheTJCdWZmZXIodTguc2xpY2Uoc3RhcnQsIGVuZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZXZlcnQuXG4gICAgICBidWZmLndyaXRlVUludDgoczAsIDApO1xuICAgICAgcmV0dXJuIHVpbnQ4QXJyYXkyQnVmZmVyKHU4LnN1YmFycmF5KHN0YXJ0LCBlbmQpKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ1ZmZTbGljZSA9IG5ldyBCdWZmZXIoZW5kIC0gc3RhcnQpO1xuICAgIGJ1ZmYuY29weShidWZmU2xpY2UsIDAsIHN0YXJ0LCBlbmQpO1xuICAgIHJldHVybiBidWZmU2xpY2U7XG4gIH1cbn1cbiJdfQ==