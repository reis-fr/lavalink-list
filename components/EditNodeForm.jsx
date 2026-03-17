'use client';

import { useState } from 'react';
import { Loader } from 'lucide-react';

export default function EditNodeForm({ node, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    identifier: node.identifier,
    host: node.host,
    port: String(node.port),
    password: node.password,
    secure: node.secure,
    restVersion: node.restVersion,
    website: node.website || '',
    discord: node.discord || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/nodes?id=${node.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update node');
      }

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Edit Node</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-destructive/20 text-destructive rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identifier */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Node Identifier
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Host */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Host Address
            </label>
            <input
              type="text"
              name="host"
              value={formData.host}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Port */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Port
            </label>
            <input
              type="number"
              name="port"
              value={formData.port}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* REST Version */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              REST Version
            </label>
            <select
              name="restVersion"
              value={formData.restVersion}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="v4">v4</option>
              <option value="v3">v3</option>
            </select>
          </div>

          {/* Secure */}
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="secure"
                checked={formData.secure}
                onChange={handleChange}
                className="w-4 h-4 rounded border-border bg-background text-primary cursor-pointer"
              />
              <span className="text-sm font-semibold text-foreground">Use HTTPS</span>
            </label>
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Website (Optional)
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Discord */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Discord Server (Optional)
          </label>
          <input
            type="url"
            name="discord"
            value={formData.discord}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
