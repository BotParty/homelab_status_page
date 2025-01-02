'use client';
// pages/index.js
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // ----------------------
  // 1. Fetch initial messages (latest 100, newest first)
  // ----------------------
  useEffect(() => {
    fetchInitialMessages();

    // ----------------------
    // 2. Subscribe to new inserts in real-time
    // ----------------------
    const channel = supabase
      .channel('group_chat_messages') // any unique name
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'group_chat_messages' },
        (payload) => {
          handleNewMessage(payload.new);
        }
      )
      .subscribe();

    // Clean up subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchInitialMessages = async () => {
    const { data, error } = await supabase
      .from('group_chat_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('fetchInitialMessages error:', error);
      return;
    }

    // Reverse so newest is at bottom
    setMessages((data ?? []).reverse());
  };

  // ----------------------
  // 3. Handle receiving new message in real-time
  // ----------------------
  const handleNewMessage = (message) => {
    setMessages((prev) => {
      const updated = [...prev, message];
      // Only keep 100 in client
      if (updated.length > 100) {
        updated.shift(); // remove oldest
      }
      return updated;
    });
  };

  // ----------------------
  // 4. Insert new message
  // ----------------------


  
  const sendMessage = async (event) => {
    event.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from('group_chat_messages')
      .insert([{ message_data: newMessage.trim() }]);

    if (error) {
      console.error('sendMessage error:', error);
      return;
    }

    setNewMessage('');

    // If you are NOT using the DB trigger, you can call client-side trimming:
    // await trimOldMessagesFromDB();
  };

  // ----------------------
  // (Optional) If you are NOT using the Postgres trigger,
  // you can keep DB at 100 purely from the client with this:
  // ----------------------
  const trimOldMessagesFromDB = async () => {
    // Get all messages, order by new -> old
    const { data, error } = await supabase
      .from('group_chat_messages')
      .select('id')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.error('trimOldMessagesFromDB error:', error);
      return;
    }

    // If we have <= 100 total, nothing to do
    if (data.length <= 100) return;

    // IDs to delete (all but the first 100)
    const idsToDelete = data.slice(100).map((msg) => msg.id);

    // Delete older messages
    const { error: deleteError } = await supabase
      .from('group_chat_messages')
      .delete()
      .in('id', idsToDelete);

    if (deleteError) {
      console.error('trimOldMessagesFromDB delete error:', deleteError);
    }
  };

  // ----------------------
  // Render
  // ----------------------
  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Group Chat (Append-Only)</h1>

      {/* Messages List */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: 4,
          padding: 10,
          maxHeight: 400,
          overflowY: 'auto',
          marginBottom: 20,
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: 8 }}>
            <span>{msg.message_data}</span>
          </div>
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 4,
            border: '1px solid #ccc',
            color: 'blue'
          }}
        />
      </form>
    </main>
  );
}
