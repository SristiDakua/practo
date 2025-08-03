"use client";

import { useState } from 'react';
import { BookOpen, Clock, User, Heart, Eye, Share2, Bookmark, TrendingUp, Filter, Calendar, Tag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorTitle: string;
  publishDate: string;
  readTime: number;
  category: string;
  tags: string[];
  imageUrl: string;
  views: number;
  likes: number;
  isFeatured: boolean;
  isTrending: boolean;
}

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleDialog, setArticleDialog] = useState(false);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<number[]>([]);

  const articles: Article[] = [
    {
      id: 1,
      title: "10 Essential Tips for Maintaining Heart Health in Your 40s",
      excerpt: "Discover crucial lifestyle changes and preventive measures to keep your heart healthy as you age. Learn about diet modifications, exercise routines, and regular health checkups that can significantly reduce your risk of cardiovascular disease.",
      content: `# 10 Essential Tips for Maintaining Heart Health in Your 40s

As we enter our 40s, taking care of our heart becomes more crucial than ever. Here are ten evidence-based strategies to maintain optimal cardiovascular health:

## 1. Regular Exercise
Aim for at least 150 minutes of moderate-intensity aerobic activity weekly. Include both cardio and strength training exercises.

## 2. Heart-Healthy Diet
Focus on:
- Fruits and vegetables
- Whole grains
- Lean proteins
- Healthy fats (omega-3 fatty acids)
- Limited sodium and processed foods

## 3. Regular Health Screenings
Monitor your:
- Blood pressure
- Cholesterol levels
- Blood sugar
- Body weight

## 4. Stress Management
Practice stress-reduction techniques like:
- Meditation
- Deep breathing exercises
- Yoga
- Regular sleep schedule

## 5. Quit Smoking
Smoking significantly increases heart disease risk. Seek professional help if needed.

Remember, small changes in your 40s can have a profound impact on your heart health in the decades to come.`,
      author: "Dr. Priya Sharma",
      authorTitle: "Cardiologist",
      publishDate: "2024-01-15",
      readTime: 8,
      category: "Heart Health",
      tags: ["heart", "cardiovascular", "prevention", "lifestyle"],
      imageUrl: "/api/placeholder/400/200",
      views: 15420,
      likes: 892,
      isFeatured: true,
      isTrending: true
    },
    {
      id: 2,
      title: "Understanding Diabetes: Early Signs and Prevention Strategies",
      excerpt: "Learn to recognize the early warning signs of diabetes and discover effective prevention strategies through lifestyle modifications, dietary changes, and regular monitoring.",
      content: `# Understanding Diabetes: Early Signs and Prevention Strategies

Diabetes is a growing health concern worldwide. Early detection and prevention are key to managing this condition effectively.

## Early Warning Signs

### Type 2 Diabetes Signs:
- Increased thirst and frequent urination
- Unexplained weight loss
- Fatigue and weakness
- Blurred vision
- Slow-healing wounds

## Prevention Strategies

### Lifestyle Modifications:
1. **Maintain healthy weight**: Even a 5-10% weight loss can significantly reduce diabetes risk
2. **Regular physical activity**: 30 minutes of moderate exercise daily
3. **Balanced diet**: Focus on whole foods, limit processed sugars
4. **Regular monitoring**: Annual blood sugar tests after age 35

### Risk Factors to Monitor:
- Family history
- Age (over 45)
- High blood pressure
- High cholesterol
- Previous gestational diabetes

Early intervention can prevent or delay the onset of Type 2 diabetes in many cases.`,
      author: "Dr. Rajesh Kumar",
      authorTitle: "Endocrinologist",
      publishDate: "2024-01-12",
      readTime: 6,
      category: "Diabetes",
      tags: ["diabetes", "prevention", "symptoms", "health screening"],
      imageUrl: "/api/placeholder/400/200",
      views: 12350,
      likes: 654,
      isFeatured: true,
      isTrending: false
    },
    {
      id: 3,
      title: "Mental Health Awareness: Breaking the Stigma and Seeking Help",
      excerpt: "Explore the importance of mental health awareness, recognize common mental health conditions, and learn about available resources and treatment options.",
      content: `# Mental Health Awareness: Breaking the Stigma and Seeking Help

Mental health is just as important as physical health, yet stigma often prevents people from seeking the help they need.

## Common Mental Health Conditions

### Depression
- Persistent sadness
- Loss of interest in activities
- Fatigue and sleep disturbances
- Changes in appetite

### Anxiety Disorders
- Excessive worry
- Physical symptoms (rapid heartbeat, sweating)
- Avoidance behaviors
- Panic attacks

## Breaking the Stigma

### How to Help:
1. **Educate yourself** about mental health conditions
2. **Use respectful language** when discussing mental health
3. **Listen without judgment** to those sharing their experiences
4. **Encourage professional help** when appropriate

### Seeking Help:
- Talk to your primary care physician
- Consider therapy or counseling
- Look into support groups
- Explore medication options if recommended

Remember: Seeking help for mental health is a sign of strength, not weakness.`,
      author: "Dr. Anita Desai",
      authorTitle: "Psychiatrist",
      publishDate: "2024-01-10",
      readTime: 7,
      category: "Mental Health",
      tags: ["mental health", "depression", "anxiety", "stigma"],
      imageUrl: "/api/placeholder/400/200",
      views: 18750,
      likes: 1245,
      isFeatured: false,
      isTrending: true
    },
    {
      id: 4,
      title: "Nutrition Essentials: Building a Balanced Diet for Optimal Health",
      excerpt: "Master the fundamentals of nutrition with this comprehensive guide to creating balanced meals, understanding macronutrients, and making informed food choices.",
      content: `# Nutrition Essentials: Building a Balanced Diet for Optimal Health

Good nutrition is the foundation of good health. Understanding the basics can help you make better food choices daily.

## Macronutrients

### Carbohydrates (45-65% of daily calories)
- **Complex carbs**: Whole grains, vegetables, legumes
- **Simple carbs**: Fruits, dairy (limit added sugars)

### Proteins (10-35% of daily calories)
- **Complete proteins**: Meat, fish, eggs, dairy
- **Incomplete proteins**: Beans, nuts, grains

### Fats (20-35% of daily calories)
- **Healthy fats**: Olive oil, avocados, nuts, fatty fish
- **Limit**: Saturated and trans fats

## Building Balanced Meals

### The Plate Method:
- **1/2 plate**: Non-starchy vegetables
- **1/4 plate**: Lean protein
- **1/4 plate**: Whole grains or starchy vegetables
- **Add**: Healthy fats and dairy

## Practical Tips

1. **Meal prep** on weekends
2. **Read nutrition labels** carefully
3. **Stay hydrated** with water
4. **Practice portion control**
5. **Listen to your body's** hunger and fullness cues

Small, consistent changes in your eating habits can lead to significant health improvements over time.`,
      author: "Dr. Meera Patel",
      authorTitle: "Nutritionist",
      publishDate: "2024-01-08",
      readTime: 10,
      category: "Nutrition",
      tags: ["nutrition", "diet", "healthy eating", "macronutrients"],
      imageUrl: "/api/placeholder/400/200",
      views: 9840,
      likes: 567,
      isFeatured: false,
      isTrending: false
    },
    {
      id: 5,
      title: "Women's Health: Essential Screenings and Preventive Care",
      excerpt: "Stay informed about crucial health screenings for women at different life stages, from reproductive health to cancer prevention and bone health.",
      content: `# Women's Health: Essential Screenings and Preventive Care

Women's health needs change throughout different life stages. Regular screenings and preventive care are essential.

## Essential Screenings by Age

### Ages 20-30
- **Annual well-woman exam**
- **Pap smear** (every 3 years starting at 21)
- **STI screening** if sexually active
- **Blood pressure** check annually

### Ages 30-40
- **Pap smear + HPV test** (every 5 years)
- **Cholesterol screening** (every 5 years)
- **Diabetes screening** (every 3 years if risk factors present)
- **Skin cancer** self-exams monthly

### Ages 40-50
- **Mammogram** (annually starting at 40-50, discuss with doctor)
- **Bone density** screening (if risk factors present)
- **Thyroid function** test (every 5 years)
- **Colon cancer** screening (starting at 45-50)

### Ages 50+
- **All previous screenings** continue
- **Bone density** test (every 2 years)
- **Eye exams** annually
- **Hearing tests** as recommended

## Reproductive Health

### Family Planning
- Discuss contraceptive options
- Preconception counseling if planning pregnancy
- Fertility assessments if trying to conceive

### Menopause Management
- Hormone level monitoring
- Discussion of hormone replacement therapy
- Bone health evaluation

Regular preventive care and open communication with healthcare providers are key to maintaining optimal women's health.`,
      author: "Dr. Sunita Reddy",
      authorTitle: "Gynecologist",
      publishDate: "2024-01-05",
      readTime: 9,
      category: "Women's Health",
      tags: ["women's health", "screenings", "prevention", "reproductive health"],
      imageUrl: "/api/placeholder/400/200",
      views: 14230,
      likes: 823,
      isFeatured: true,
      isTrending: false
    },
    {
      id: 6,
      title: "The Science of Sleep: How Quality Rest Impacts Your Health",
      excerpt: "Understand the critical role of sleep in physical and mental health, learn about sleep disorders, and discover evidence-based strategies for better sleep quality.",
      content: `# The Science of Sleep: How Quality Rest Impacts Your Health

Sleep is not a luxury—it's a biological necessity that affects every aspect of our health and well-being.

## Why Sleep Matters

### Physical Health Benefits:
- **Immune system** strengthening
- **Tissue repair** and growth
- **Hormone regulation**
- **Cardiovascular health** maintenance

### Mental Health Benefits:
- **Memory consolidation**
- **Emotional regulation**
- **Stress reduction**
- **Mental clarity** and focus

## Sleep Requirements by Age

- **Newborns**: 14-17 hours
- **Children (3-5 years)**: 10-13 hours
- **School age (6-13 years)**: 9-11 hours
- **Teenagers**: 8-10 hours
- **Adults**: 7-9 hours
- **Older adults**: 7-8 hours

## Common Sleep Disorders

### Sleep Apnea
- Breathing interruptions during sleep
- Loud snoring, gasping
- Daytime fatigue

### Insomnia
- Difficulty falling or staying asleep
- Early morning awakening
- Non-restorative sleep

## Improving Sleep Quality

### Sleep Hygiene Tips:
1. **Consistent sleep schedule**
2. **Comfortable sleep environment** (cool, dark, quiet)
3. **Limit screen time** before bed
4. **Avoid caffeine** late in the day
5. **Regular exercise** (not close to bedtime)
6. **Relaxation techniques** before sleep

### When to Seek Help:
- Persistent sleep problems
- Excessive daytime sleepiness
- Loud snoring with breathing pauses
- Difficulty staying asleep

Quality sleep is an investment in your overall health and quality of life.`,
      author: "Dr. Vikash Singh",
      authorTitle: "Sleep Medicine Specialist",
      publishDate: "2024-01-03",
      readTime: 11,
      category: "Sleep Health",
      tags: ["sleep", "sleep disorders", "insomnia", "health"],
      imageUrl: "/api/placeholder/400/200",
      views: 11650,
      likes: 734,
      isFeatured: false,
      isTrending: true
    }
  ];

  const categories = ['all', 'Heart Health', 'Diabetes', 'Mental Health', 'Nutrition', 'Women\'s Health', 'Sleep Health'];

  const toggleBookmark = (articleId: number) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(article => article.isFeatured);
  const trendingArticles = articles.filter(article => article.isTrending);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <a href="/" className="text-2xl font-bold flex items-center">
                  <div className="w-2 h-2 bg-sky-400 rounded-full mr-2"></div>
                  <span style={{color: '#1e3a8a'}}>practo</span>
                  <div className="w-2 h-2 bg-sky-400 rounded-full ml-2"></div>
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="/doctors" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                  Find Doctors
                </a>
                <a href="/medicines" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                  Medicines
                </a>
                <a href="/lab-tests" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                  Lab Tests
                </a>
                <a href="/medical-records" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                  Medical Records
                </a>
                <span className="text-blue-600 font-medium px-3 py-2 border-b-2 border-blue-600">
                  Health Articles
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="font-medium">
                For Healthcare Providers
              </Button>
              <Button variant="outline" className="font-medium">
                Login / Signup
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-12 w-12 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold">Health Articles</h1>
            </div>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Expert-written articles on health, wellness, and medical conditions to help you stay informed
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="all-articles" className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <TabsList className="grid w-full lg:w-auto grid-cols-3">
              <TabsTrigger value="all-articles">All Articles</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>

            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all-articles" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-gray-400" />
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          {article.isFeatured && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">Featured</Badge>
                          )}
                          {article.isTrending && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
                          {article.title}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(article.id)}
                        className={bookmarkedArticles.includes(article.id) ? "text-blue-600" : "text-gray-400"}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime} min read
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {article.views.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {article.likes}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(article.publishDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{article.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <Button
                        onClick={() => {
                          setSelectedArticle(article);
                          setArticleDialog(true);
                        }}
                        className="flex-1 mr-2"
                      >
                        Read Article
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-yellow-600 mr-2" />
                <h3 className="font-semibold text-yellow-800">Featured Articles</h3>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                Carefully selected articles by our medical experts covering essential health topics.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                  <div className="h-64 bg-gradient-to-r from-yellow-100 to-orange-100 flex items-center justify-center">
                    <BookOpen className="h-20 w-20 text-gray-400" />
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">Featured</Badge>
                      <Badge variant="outline" className="text-xs">{article.category}</Badge>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {article.title}
                    </h3>

                    <p className="text-gray-600">{article.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                        <span className="text-gray-400">•</span>
                        <span>{article.authorTitle}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime} min read
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <Button
                        onClick={() => {
                          setSelectedArticle(article);
                          setArticleDialog(true);
                        }}
                        className="flex-1 mr-2"
                      >
                        Read Full Article
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(article.id)}
                        className={bookmarkedArticles.includes(article.id) ? "text-blue-600" : "text-gray-400"}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="font-semibold text-red-800">Trending Articles</h3>
              </div>
              <p className="text-red-700 text-sm mt-1">
                Most popular health articles this week based on reader engagement.
              </p>
            </div>

            <div className="space-y-6">
              {trendingArticles.map((article, index) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-red-600">#{index + 1}</span>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-red-100 text-red-800 text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                          <Badge variant="outline" className="text-xs">{article.category}</Badge>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                          {article.title}
                        </h3>

                        <p className="text-gray-600">{article.excerpt}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {article.author}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {article.views.toLocaleString()} views
                            </div>
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              {article.likes} likes
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <Button
                            onClick={() => {
                              setSelectedArticle(article);
                              setArticleDialog(true);
                            }}
                          >
                            Read Article
                          </Button>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleBookmark(article.id)}
                              className={bookmarkedArticles.includes(article.id) ? "text-blue-600" : "text-gray-400"}
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Article Dialog */}
      <Dialog open={articleDialog} onOpenChange={setArticleDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{selectedArticle.category}</Badge>
                    {selectedArticle.isFeatured && (
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">Featured</Badge>
                    )}
                    {selectedArticle.isTrending && (
                      <Badge className="bg-red-100 text-red-800 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <DialogTitle className="text-2xl font-bold leading-tight">
                    {selectedArticle.title}
                  </DialogTitle>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{selectedArticle.author}</span>
                        <span className="text-gray-400 mx-1">•</span>
                        <span>{selectedArticle.authorTitle}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(selectedArticle.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {selectedArticle.readTime} min read
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="h-64 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-20 w-20 text-gray-400" />
                </div>

                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                    {selectedArticle.content}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {selectedArticle.views.toLocaleString()} views
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {selectedArticle.likes} likes
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(selectedArticle.id)}
                        className={bookmarkedArticles.includes(selectedArticle.id) ? "text-blue-600" : "text-gray-400"}
                      >
                        <Bookmark className="h-4 w-4 mr-1" />
                        {bookmarkedArticles.includes(selectedArticle.id) ? 'Bookmarked' : 'Bookmark'}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">About the Author</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedArticle.author}</p>
                      <p className="text-sm text-gray-600">{selectedArticle.authorTitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
