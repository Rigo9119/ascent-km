-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom types
CREATE TYPE event_type AS ENUM ('public', 'private');
CREATE TYPE event_category AS ENUM ('music', 'food', 'sports', 'art', 'culture', 'technology', 'education', 'health', 'travel', 'social', 'other');
CREATE TYPE community_category AS ENUM ('Entertainment', 'Food & Culture', 'Education', 'Travel & Adventure', 'Technology', 'Sports', 'Art', 'Health', 'Business', 'Other');
CREATE TYPE blog_category AS ENUM ('Food & Culture', 'Travel', 'Technology', 'Lifestyle', 'Events', 'Tips & Guides', 'Other');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    website TEXT,
    phone TEXT,
    date_of_birth DATE,
    interests TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE public.categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations table
CREATE TABLE public.locations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    lat DECIMAL(10, 8) NOT NULL,
    lng DECIMAL(11, 8) NOT NULL,
    image TEXT,
    category_id INTEGER REFERENCES public.categories(id),
    rating DECIMAL(3, 2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    opening_hours JSONB,
    contact_info JSONB,
    tags TEXT[],
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE public.events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    long_description TEXT,
    date DATE NOT NULL,
    time TIME,
    location_id INTEGER REFERENCES public.locations(id),
    location_text TEXT, -- For events not tied to specific locations
    category event_category NOT NULL,
    type event_type NOT NULL DEFAULT 'public',
    fee BOOLEAN DEFAULT FALSE,
    price DECIMAL(10, 2),
    currency TEXT DEFAULT 'KRW',
    image TEXT,
    capacity INTEGER,
    current_attendees INTEGER DEFAULT 0,
    organizer_id UUID REFERENCES public.profiles(id),
    organizer_name TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    website TEXT,
    requirements TEXT[],
    highlights TEXT[],
    tags TEXT[],
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Communities table
CREATE TABLE public.communities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    long_description TEXT,
    image TEXT,
    address TEXT,
    category community_category NOT NULL,
    member_count INTEGER DEFAULT 0,
    organizer_id UUID REFERENCES public.profiles(id),
    organizer_name TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    website TEXT,
    meeting_frequency TEXT,
    next_meeting TIMESTAMP WITH TIME ZONE,
    tags TEXT[],
    rules TEXT[],
    is_private BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE public.blog_posts (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    image TEXT,
    author_id UUID REFERENCES public.profiles(id),
    author_name TEXT NOT NULL,
    category blog_category NOT NULL,
    read_time INTEGER, -- in minutes
    view_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    tags TEXT[],
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community members table
CREATE TABLE public.community_members (
    id SERIAL PRIMARY KEY,
    community_id INTEGER REFERENCES public.communities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member', -- member, moderator, admin
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(community_id, user_id)
);

-- Community events table (events organized by communities)
CREATE TABLE public.community_events (
    id SERIAL PRIMARY KEY,
    community_id INTEGER REFERENCES public.communities(id) ON DELETE CASCADE,
    event_id INTEGER REFERENCES public.events(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(community_id, event_id)
);

-- Community discussions table
CREATE TABLE public.community_discussions (
    id SERIAL PRIMARY KEY,
    community_id INTEGER REFERENCES public.communities(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    author_id UUID REFERENCES public.profiles(id),
    author_name TEXT NOT NULL,
    reply_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Discussion replies table
CREATE TABLE public.discussion_replies (
    id SERIAL PRIMARY KEY,
    discussion_id INTEGER REFERENCES public.community_discussions(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.profiles(id),
    author_name TEXT NOT NULL,
    parent_reply_id INTEGER REFERENCES public.discussion_replies(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event attendees table
CREATE TABLE public.event_attendees (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'registered', -- registered, attended, cancelled
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Favorites table
CREATE TABLE public.favorites (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('event', 'location', 'community', 'blog_post')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, item_id, item_type)
);

-- User activity history table
CREATE TABLE public.user_activity (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- view, favorite, attend, join, etc.
    item_type TEXT NOT NULL, -- event, location, community, blog_post
    item_id INTEGER NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog post bookmarks table
CREATE TABLE public.blog_bookmarks (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    blog_post_id INTEGER REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, blog_post_id)
);

-- Location reviews table
CREATE TABLE public.location_reviews (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES public.locations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    images TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(location_id, user_id)
);

-- Event reviews table
CREATE TABLE public.event_reviews (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    images TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_events_date ON public.events(date);
CREATE INDEX idx_events_category ON public.events(category);
CREATE INDEX idx_events_location ON public.events(location_id);
CREATE INDEX idx_events_organizer ON public.events(organizer_id);
CREATE INDEX idx_events_featured ON public.events(is_featured) WHERE is_featured = TRUE;

CREATE INDEX idx_locations_coordinates ON public.locations(lat, lng);
CREATE INDEX idx_locations_category ON public.locations(category_id);
CREATE INDEX idx_locations_featured ON public.locations(is_featured) WHERE is_featured = TRUE;

CREATE INDEX idx_communities_category ON public.communities(category);
CREATE INDEX idx_communities_organizer ON public.communities(organizer_id);
CREATE INDEX idx_communities_featured ON public.communities(is_featured) WHERE is_featured = TRUE;

CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_author ON public.blog_posts(author_id);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published_at) WHERE is_published = TRUE;

CREATE INDEX idx_favorites_user ON public.favorites(user_id);
CREATE INDEX idx_favorites_item ON public.favorites(item_type, item_id);

CREATE INDEX idx_community_members_user ON public.community_members(user_id);
CREATE INDEX idx_community_members_community ON public.community_members(community_id);

CREATE INDEX idx_event_attendees_user ON public.event_attendees(user_id);
CREATE INDEX idx_event_attendees_event ON public.event_attendees(event_id);

-- Create full-text search indexes
CREATE INDEX idx_events_search ON public.events USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '')));
CREATE INDEX idx_locations_search ON public.locations USING GIN (to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_communities_search ON public.communities USING GIN (to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_blog_posts_search ON public.blog_posts USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(content, '')));

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON public.locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_communities_updated_at BEFORE UPDATE ON public.communities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_discussions_updated_at BEFORE UPDATE ON public.community_discussions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_replies_updated_at BEFORE UPDATE ON public.discussion_replies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_location_reviews_updated_at BEFORE UPDATE ON public.location_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_event_reviews_updated_at BEFORE UPDATE ON public.event_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to update member count
CREATE OR REPLACE FUNCTION update_community_member_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.communities SET member_count = member_count + 1 WHERE id = NEW.community_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.communities SET member_count = member_count - 1 WHERE id = OLD.community_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_community_member_count_trigger
    AFTER INSERT OR DELETE ON public.community_members
    FOR EACH ROW EXECUTE FUNCTION update_community_member_count();

-- Create trigger to update event attendee count
CREATE OR REPLACE FUNCTION update_event_attendee_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.events SET current_attendees = current_attendees + 1 WHERE id = NEW.event_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.events SET current_attendees = current_attendees - 1 WHERE id = OLD.event_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_event_attendee_count_trigger
    AFTER INSERT OR DELETE ON public.event_attendees
    FOR EACH ROW EXECUTE FUNCTION update_event_attendee_count();

-- Create trigger to update discussion reply count
CREATE OR REPLACE FUNCTION update_discussion_reply_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.community_discussions SET reply_count = reply_count + 1 WHERE id = NEW.discussion_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.community_discussions SET reply_count = reply_count - 1 WHERE id = OLD.discussion_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_discussion_reply_count_trigger
    AFTER INSERT OR DELETE ON public.discussion_replies
    FOR EACH ROW EXECUTE FUNCTION update_discussion_reply_count();

-- Create trigger to update location rating
CREATE OR REPLACE FUNCTION update_location_rating()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.locations 
        SET rating = (
            SELECT AVG(rating)::DECIMAL(3,2) 
            FROM public.location_reviews 
            WHERE location_id = NEW.location_id
        ),
        review_count = (
            SELECT COUNT(*) 
            FROM public.location_reviews 
            WHERE location_id = NEW.location_id
        )
        WHERE id = NEW.location_id;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE public.locations 
        SET rating = (
            SELECT AVG(rating)::DECIMAL(3,2) 
            FROM public.location_reviews 
            WHERE location_id = NEW.location_id
        )
        WHERE id = NEW.location_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.locations 
        SET rating = (
            SELECT AVG(rating)::DECIMAL(3,2) 
            FROM public.location_reviews 
            WHERE location_id = OLD.location_id
        ),
        review_count = (
            SELECT COUNT(*) 
            FROM public.location_reviews 
            WHERE location_id = OLD.location_id
        )
        WHERE id = OLD.location_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_location_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.location_reviews
    FOR EACH ROW EXECUTE FUNCTION update_location_rating();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.location_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Locations policies
CREATE POLICY "Locations are viewable by everyone" ON public.locations FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create locations" ON public.locations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own locations" ON public.locations FOR UPDATE USING (auth.uid() IN (SELECT organizer_id FROM public.events WHERE location_id = id));

-- Events policies
CREATE POLICY "Events are viewable by everyone" ON public.events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events" ON public.events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own events" ON public.events FOR UPDATE USING (auth.uid() = organizer_id);
CREATE POLICY "Users can delete own events" ON public.events FOR DELETE USING (auth.uid() = organizer_id);

-- Communities policies
CREATE POLICY "Communities are viewable by everyone" ON public.communities FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create communities" ON public.communities FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Organizers can update communities" ON public.communities FOR UPDATE USING (auth.uid() = organizer_id);
CREATE POLICY "Organizers can delete communities" ON public.communities FOR DELETE USING (auth.uid() = organizer_id);

-- Blog posts policies
CREATE POLICY "Published blog posts are viewable by everyone" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Authors can view own posts" ON public.blog_posts FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "Authenticated users can create blog posts" ON public.blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authors can update own posts" ON public.blog_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own posts" ON public.blog_posts FOR DELETE USING (auth.uid() = author_id);

-- Community members policies
CREATE POLICY "Community members are viewable by everyone" ON public.community_members FOR SELECT USING (true);
CREATE POLICY "Authenticated users can join communities" ON public.community_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave communities" ON public.community_members FOR DELETE USING (auth.uid() = user_id);

-- Event attendees policies
CREATE POLICY "Event attendees are viewable by everyone" ON public.event_attendees FOR SELECT USING (true);
CREATE POLICY "Authenticated users can register for events" ON public.event_attendees FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can cancel event registration" ON public.event_attendees FOR DELETE USING (auth.uid() = user_id);

-- Favorites policies
CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can create favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- User activity policies
CREATE POLICY "Users can view own activity" ON public.user_activity FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can create activity" ON public.user_activity FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Blog bookmarks policies
CREATE POLICY "Users can view own bookmarks" ON public.blog_bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can create bookmarks" ON public.blog_bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks" ON public.blog_bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON public.location_reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON public.location_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON public.location_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON public.location_reviews FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Event reviews are viewable by everyone" ON public.event_reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create event reviews" ON public.event_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own event reviews" ON public.event_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own event reviews" ON public.event_reviews FOR DELETE USING (auth.uid() = user_id);

-- Discussion policies
CREATE POLICY "Discussions are viewable by everyone" ON public.community_discussions FOR SELECT USING (true);
CREATE POLICY "Community members can create discussions" ON public.community_discussions FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT user_id FROM public.community_members WHERE community_id = community_id)
);
CREATE POLICY "Authors can update own discussions" ON public.community_discussions FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own discussions" ON public.community_discussions FOR DELETE USING (auth.uid() = author_id);

-- Reply policies
CREATE POLICY "Replies are viewable by everyone" ON public.discussion_replies FOR SELECT USING (true);
CREATE POLICY "Community members can create replies" ON public.discussion_replies FOR INSERT WITH CHECK (
    auth.uid() IN (
        SELECT cm.user_id 
        FROM public.community_members cm 
        JOIN public.community_discussions cd ON cm.community_id = cd.community_id 
        WHERE cd.id = discussion_id
    )
);
CREATE POLICY "Authors can update own replies" ON public.discussion_replies FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own replies" ON public.discussion_replies FOR DELETE USING (auth.uid() = author_id);

-- Insert sample categories
INSERT INTO public.categories (name, slug, description, color) VALUES
('Music', 'music', 'Music events and activities', '#3B82F6'),
('Food', 'food', 'Food and dining experiences', '#EF4444'),
('Sports', 'sports', 'Sports and fitness activities', '#10B981'),
('Art', 'art', 'Art and creative activities', '#8B5CF6'),
('Culture', 'culture', 'Cultural events and activities', '#F59E0B'),
('Technology', 'technology', 'Technology and innovation', '#6366F1'),
('Education', 'education', 'Educational events and workshops', '#06B6D4'),
('Health', 'health', 'Health and wellness activities', '#84CC16'),
('Travel', 'travel', 'Travel and adventure activities', '#F97316'),
('Social', 'social', 'Social gatherings and meetups', '#EC4899'),
('Other', 'other', 'Other activities and events', '#6B7280');

-- Create a function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 