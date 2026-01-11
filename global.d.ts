declare module 'flowbite/plugin';
declare module 'flowbite';
declare module 'react-activity-calendar' {
  export type CalendarData = Array<{ date: string; count: number; level: number }>;
  const ReactActivityCalendar: React.ComponentType<{ username?: string; [key: string]: any }>;
  export default ReactActivityCalendar;
}
