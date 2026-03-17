'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Plus, Edit, Trash2, LogOut, Music } from 'lucide-react';
import AddNodeForm from '@/components/AddNodeForm';
import EditNodeForm from '@/components/EditNodeForm';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNode, setEditingNode] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUserNodes();
    }
  }, [status]);

  const fetchUserNodes = async () => {
    try {
      const res = await fetch('/api/nodes');
      const allNodes = await res.json();
      const userNodes = allNodes.filter(node => node.userId === session?.user?.id);
      setNodes(userNodes);
    } catch (error) {
      console.error('Failed to fetch nodes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNode = async (nodeId) => {
    if (!confirm('Are you sure you want to delete this node?')) return;
    
    setDeleting(nodeId);
    try {
      const res = await fetch(`/api/nodes?id=${nodeId}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setNodes(nodes.filter(n => n.id !== nodeId));
      } else {
        alert('Failed to delete node');
      }
    } catch (error) {
      console.error('Error deleting node:', error);
      alert('Error deleting node');
    } finally {
      setDeleting(null);
    }
  };

  const handleNodeAdded = () => {
    setShowAddForm(false);
    fetchUserNodes();
  };

  const handleNodeUpdated = () => {
    setEditingNode(null);
    fetchUserNodes();
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Music className="w-12 h-12 mx-auto mb-4 text-primary animate-bounce" />
          <p className="text-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Music className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Lavalink Dashboard</h1>
          <p className="text-muted-foreground mb-8 text-lg">Sign in to manage your nodes</p>
          <button
            onClick={() => signIn('discord')}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
          >
            Sign in with Discord
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Musical Waves Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 flex items-end justify-center gap-2 h-96 bottom-0">
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-32 wave-animate-1"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-40 wave-animate-2"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-36 wave-animate-3"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-44 wave-animate-4"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-32 wave-animate-1"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-40 wave-animate-2"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-36 wave-animate-3"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-44 wave-animate-4"></div>
          <div className="w-1 bg-gradient-to-t from-primary to-transparent h-32 wave-animate-1"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Music className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Lavalink Dashboard</h1>
          </Link>
          <div className="flex items-center gap-4">
            {session?.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-10 h-10 rounded-full border-2 border-primary"
              />
            )}
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-foreground">{session?.user?.name}</p>
              <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="p-2 hover:bg-secondary rounded-lg transition text-muted-foreground hover:text-foreground"
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-5 max-w-7xl mx-auto px-4 py-12">
        {/* Add Node Button */}
        <div className="mb-12">
          {!showAddForm && !editingNode && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
            >
              <Plus className="w-5 h-5" />
              Add New Node
            </button>
          )}
        </div>

        {/* Add Node Form */}
        {showAddForm && (
          <div className="mb-8">
            <AddNodeForm
              onSuccess={handleNodeAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {/* Edit Node Form */}
        {editingNode && (
          <div className="mb-8">
            <EditNodeForm
              node={editingNode}
              onSuccess={handleNodeUpdated}
              onCancel={() => setEditingNode(null)}
            />
          </div>
        )}

        {/* Nodes Grid */}
        {loading ? (
          <div className="text-center py-12">
            <Music className="w-12 h-12 mx-auto mb-4 text-primary animate-bounce" />
            <p className="text-muted-foreground">Loading your nodes...</p>
          </div>
        ) : nodes.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-border">
            <Music className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No nodes yet</h2>
            <p className="text-muted-foreground mb-6">Create your first Lavalink node to get started</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              Add Node
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nodes.map(node => (
              <div
                key={node.id}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {node.identifier}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {node.host}:{node.port}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                    {node.restVersion}
                  </span>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security:</span>
                    <span className="text-foreground font-medium">
                      {node.secure ? 'HTTPS' : 'HTTP'}
                    </span>
                  </div>
                  {node.website && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Website:</span>
                      <a
                        href={node.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate"
                      >
                        {node.website}
                      </a>
                    </div>
                  )}
                  {node.discord && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discord:</span>
                      <a
                        href={node.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate"
                      >
                        Join Server
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingNode(node)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNode(node.id)}
                    disabled={deleting === node.id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-destructive/20 text-destructive rounded-lg font-medium hover:bg-destructive/30 transition disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    {deleting === node.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
