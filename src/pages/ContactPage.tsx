import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { creatorInfo } from "../data/mockData";
import { Mail, MapPin, Send, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, { message: "姓名至少包含 2 个字符" }),
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  message: z.string().min(10, { message: "留言内容至少包含 10 个字符" }),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("已发送！感谢您的留言，我会尽快回复您。");
    form.reset();
  }

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 md:py-24 max-w-6xl">
      <div className="mb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 animate-fade-in">联系我</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
          无论是合作、咨询还是仅仅打个招呼，我随时欢迎。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-4 flex flex-col gap-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col gap-8">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">联系方式 / CONTACT</h2>
            
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-primary/10 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">邮箱</span>
                <a href={`mailto:${creatorInfo.contact.email}`} className="text-lg font-medium hover:text-primary transition-colors">
                  {creatorInfo.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-primary/10 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">所在地</span>
                <span className="text-lg font-medium">中国 · 上海</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-8">
             <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">社交媒体 / SOCIAL</h2>
             <div className="flex flex-wrap gap-4">
                {creatorInfo.contact.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-border text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    {link.platform}
                  </a>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-8 bg-card border border-border p-8 md:p-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-10">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">在线留言</h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-widest">姓名</FormLabel>
                      <FormControl>
                        <Input placeholder="您的姓名" className="border-0 border-b border-border rounded-none px-0 py-6 bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-all text-lg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-widest">邮箱</FormLabel>
                      <FormControl>
                        <Input placeholder="您的邮箱地址" className="border-0 border-b border-border rounded-none px-0 py-6 bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-all text-lg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest">留言内容</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="您想对我说什么..." 
                        className="min-h-[150px] border-0 border-b border-border rounded-none px-0 py-4 bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-all text-lg resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full md:w-auto px-12 py-8 text-lg font-bold tracking-widest uppercase group transition-all">
                发送留言
                <Send className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
