import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import router from '../routes/web.js';
import NomorSurat from '../models/nomor_surat.js';

// Mock the NomorSurat model
vi.mock('../models/nomor_surat.js', () => {
  return {
    default: {
      findAll: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      destroy: vi.fn()
    }
  };
});

const app = express();
app.use(express.json());
app.use(router);

describe('Nomor Surat Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /nomor-surat', () => {
    it('should return all nomor surat', async () => {
      const mockNomorSurat = [
        { id: 1, nomor: '001/OSIS/2024' },
        { id: 2, nomor: '002/OSIS/2024' }
      ];

      NomorSurat.findAll.mockResolvedValue(mockNomorSurat);

      const response = await request(app)
        .get('/nomor-surat')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockNomorSurat);
      expect(NomorSurat.findAll).toHaveBeenCalled();
    });
  });

  describe('POST /nomor-surat', () => {
    it('should create a new nomor surat', async () => {
      const newNomorSurat = { nomor: '003/OSIS/2024' };
      const mockCreatedNomorSurat = { id: 3, ...newNomorSurat };

      NomorSurat.create.mockResolvedValue(mockCreatedNomorSurat);

      const response = await request(app)
        .post('/nomor-surat')
        .send(newNomorSurat)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockCreatedNomorSurat);
      expect(NomorSurat.create).toHaveBeenCalledWith(newNomorSurat);
    });
  });

  describe('PUT /nomor-surat/:id', () => {
    it('should update an existing nomor surat', async () => {
      const id = '1';
      const updatedData = { nomor: '001-updated/OSIS/2024' };
      const mockUpdatedResult = [1]; // Sequelize returns array with number of affected rows

      NomorSurat.update.mockResolvedValue(mockUpdatedResult);

      const response = await request(app)
        .put(`/nomor-surat/${id}`)
        .send(updatedData)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockUpdatedResult);
      expect(NomorSurat.update).toHaveBeenCalledWith(updatedData, {
        where: { id }
      });
    });
  });

  describe('DELETE /nomor-surat/:id', () => {
    it('should delete a nomor surat', async () => {
      const id = '1';
      const mockDeleteResult = 1; // Sequelize returns number of deleted rows

      NomorSurat.destroy.mockResolvedValue(mockDeleteResult);

      const response = await request(app)
        .delete(`/nomor-surat/${id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({ message: 'Nomor Surat Deleted' });
      expect(NomorSurat.destroy).toHaveBeenCalledWith({
        where: { id }
      });
    });
  });
});
