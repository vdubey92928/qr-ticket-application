package com.vivekanand.qrticket.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.qrcode.QRCodeWriter;

public final class QRCodeGenerator {

    private static final int QR_WIDTH = 200;
    private static final int QR_HEIGHT = 200;

    private QRCodeGenerator() {
        // utility class
    }

    /**
     * Generates QR code PNG as byte array
     */
    public static byte[] generateQrPng(String data) {

        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();

            BitMatrix bitMatrix = qrCodeWriter.encode(
                    data,
                    BarcodeFormat.QR_CODE,
                    QR_WIDTH,
                    QR_HEIGHT
            );

            BufferedImage image = MatrixToImageWriter.toBufferedImage(bitMatrix);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(image, "PNG", outputStream);

            return outputStream.toByteArray();

        } catch (WriterException ex) {
            throw new IllegalStateException("Failed to generate QR code", ex);
        } catch (Exception ex) {
            throw new IllegalStateException("Unexpected error while generating QR code", ex);
        }
    }
}
