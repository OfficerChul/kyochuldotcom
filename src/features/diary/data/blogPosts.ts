import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'hello-blog',
    title: 'Hello, Blog',
    date: '25-01-03',
    summary: 'A place to jot down the thoughts I find useful day to day.',
    tags: ['blog launch', 'writing'],
    content: `I have many different experiences and I think a lot, so my intuition is not bad. I want to write down and share what I feel and the intuition behind it here on the blog.

Some posts might be fun, and some might be sensitive. I am not sure how this will go; I am just going to scribble.`,
    translations: {
      ko: {
        title: '안녕, 블로그',
        summary: '내가 평소에 느끼는 것들 중에 유용하다고 생각하는 것들을 적는 블로그가 될 거다.',
        tags: ['블로그 시작', '글쓰기'],
        content: `나는 다양한 경험을 가지고 있다. 평소에 생각도 많이 한다. 그래서 직관도 나쁘지 않은 것 같다. 그래서 내가 느끼는 것들, 나의 직관을 블로그에 적어서 공유하려 한다.

재미있는 내용이 있을 수도 있고, 예민한 내용이 있을 수도 있다. 모르겠다 어떻게 될지. 그냥 끄적여보자.`
      },
      zh: {
        title: '你好，博客',
        summary: '在这里写下日常里觉得有用的想法。',
        tags: ['开启博客', '写作'],
        content: `我有不少不同的经历，也经常思考，所以直觉还不错。我想把自己的感受和直觉记录在博客里分享。

可能会有有趣的内容，也可能会有些敏感的内容。不知道会怎么发展，先随便写写。`
      }
    }
  }
];
