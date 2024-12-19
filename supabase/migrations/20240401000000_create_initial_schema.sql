-- Enable the pgvector extension for document embeddings
create extension if not exists vector;

-- Create documents table
create table documents (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text,
  file_path text not null,
  file_type text not null,
  file_size bigint not null,
  embedding vector(1536),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create chats table
create table chats (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create messages table
create table messages (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  role text not null check (role in ('user', 'assistant')),
  chat_id uuid not null references chats(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create message_documents table (for relevance tracking)
create table message_documents (
  id uuid default uuid_generate_v4() primary key,
  message_id uuid not null references messages(id) on delete cascade,
  document_id uuid not null references documents(id) on delete cascade,
  relevance_score float not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index idx_documents_embedding on documents using ivfflat (embedding vector_cosine_ops);
create index idx_messages_chat_id on messages(chat_id);
create index idx_message_documents_message_id on message_documents(message_id);
create index idx_message_documents_document_id on message_documents(document_id);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
create trigger documents_updated_at
  before update on documents
  for each row
  execute function update_updated_at_column();

create trigger chats_updated_at
  before update on chats
  for each row
  execute function update_updated_at_column();
