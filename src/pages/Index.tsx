import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface TimelineEvent {
  year: string;
  date: string;
  title: string;
  description: string;
  type: 'battle' | 'diplomatic' | 'naval' | 'other';
}

const timelineEvents: TimelineEvent[] = [
  { year: '1853', date: 'Июль 1853', title: 'Начало конфликта', description: 'Российские войска вступили в Дунайские княжества', type: 'other' },
  { year: '1853', date: 'Ноябрь 1853', title: 'Синопское сражение', description: 'Разгром турецкого флота адмиралом Нахимовым', type: 'naval' },
  { year: '1854', date: 'Март 1854', title: 'Объявление войны', description: 'Англия и Франция объявили войну России', type: 'diplomatic' },
  { year: '1854', date: 'Сентябрь 1854', title: 'Высадка союзников', description: 'Высадка англо-французских войск в Крыму', type: 'other' },
  { year: '1854', date: 'Октябрь 1854', title: 'Битва на Альме', description: 'Первое крупное сражение в Крыму', type: 'battle' },
  { year: '1854', date: 'Октябрь 1854 - Август 1855', title: 'Оборона Севастополя', description: '349 дней героической обороны города', type: 'battle' },
  { year: '1855', date: 'Февраль 1855', title: 'Смерть Николая I', description: 'Николай I скончался в Зимнем дворце', type: 'other' },
  { year: '1856', date: 'Март 1856', title: 'Парижский мир', description: 'Подписание мирного договора', type: 'diplomatic' },
];

const sections = [
  { id: 'intro', title: 'Введение', icon: 'BookOpen' },
  { id: 'biography', title: 'Биография Николая I', icon: 'User' },
  { id: 'prerequisites', title: 'Предпосылки войны', icon: 'AlertCircle' },
  { id: 'progress', title: 'Ход военных действий', icon: 'Swords' },
  { id: 'battles', title: 'Ключевые сражения', icon: 'Shield' },
  { id: 'results', title: 'Итоги и последствия', icon: 'FileText' },
  { id: 'conclusion', title: 'Заключение', icon: 'CheckCircle' },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('intro');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const filteredEvents = selectedYear 
    ? timelineEvents.filter(e => e.year === selectedYear)
    : timelineEvents;

  const getEventColor = (type: string) => {
    const colors = {
      battle: 'bg-red-100 text-red-800 border-red-300',
      diplomatic: 'bg-blue-100 text-blue-800 border-blue-300',
      naval: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      other: 'bg-amber-100 text-amber-800 border-amber-300',
    };
    return colors[type as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-1">Николай I</h1>
              <p className="text-muted-foreground text-lg">Крымская война 1853-1856 годов</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-sm px-3 py-1">Исторический проект</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r border-border bg-card min-h-[calc(100vh-88px)] sticky top-[88px]">
          <nav className="p-4 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-all ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <Icon name={section.icon as any} size={20} />
                <span className="text-sm font-medium">{section.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8 max-w-5xl mx-auto">
          {activeSection === 'intro' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-5xl font-bold mb-4 text-primary">Введение</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Крымская война 1853-1856 годов стала одним из наиболее значимых военных конфликтов XIX века, 
                  определив дальнейший ход развития международных отношений в Европе и на Ближнем Востоке.
                </p>
              </div>

              <Card className="border-l-4 border-l-accent">
                <CardContent className="pt-6">
                  <blockquote className="text-xl italic text-foreground/80">
                    "Россия должна показать Европе, что она все еще сильна и может защищать свои интересы"
                  </blockquote>
                  <p className="text-sm text-muted-foreground mt-2">— Николай I</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <Card className="bg-gradient-to-br from-red-50 to-white border-red-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl font-bold text-red-700 mb-2">349</div>
                    <p className="text-sm text-muted-foreground">дней обороны Севастополя</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl font-bold text-blue-700 mb-2">5</div>
                    <p className="text-sm text-muted-foreground">стран-участниц конфликта</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl font-bold text-amber-700 mb-2">1856</div>
                    <p className="text-sm text-muted-foreground">год подписания мира</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'biography' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl font-bold mb-4 text-primary">Биография Николая I</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Calendar" size={24} className="text-accent" />
                      Основные даты
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start border-l-2 border-accent pl-4">
                        <span className="font-semibold">1796</span>
                        <span className="text-sm text-muted-foreground">Рождение</span>
                      </div>
                      <div className="flex justify-between items-start border-l-2 border-accent pl-4">
                        <span className="font-semibold">1825</span>
                        <span className="text-sm text-muted-foreground">Вступление на престол</span>
                      </div>
                      <div className="flex justify-between items-start border-l-2 border-accent pl-4">
                        <span className="font-semibold">1853</span>
                        <span className="text-sm text-muted-foreground">Начало Крымской войны</span>
                      </div>
                      <div className="flex justify-between items-start border-l-2 border-accent pl-4">
                        <span className="font-semibold">1855</span>
                        <span className="text-sm text-muted-foreground">Кончина</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Crown" size={24} className="text-accent" />
                      Личность императора
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Николай I был третьим сыном императора Павла I. Не готовившийся к престолу, 
                      он получил военное образование и сделал военную карьеру. Вступление на престол 
                      было омрачено восстанием декабристов 14 декабря 1825 года.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-4">Характер правления</h3>
                  <div className="prose max-w-none text-foreground/80 leading-relaxed space-y-4">
                    <p>
                      Царствование Николая I характеризовалось строгой дисциплиной, централизацией власти 
                      и консервативной политикой. Император видел свою миссию в сохранении традиционных 
                      устоев Российской империи и борьбе с революционными идеями, проникавшими из Европы.
                    </p>
                    <p>
                      Николай I проводил активную внешнюю политику, стремясь усилить влияние России 
                      на Балканах и Ближнем Востоке. Это стремление в конечном итоге привело к 
                      столкновению с европейскими державами в Крымской войне.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'prerequisites' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl font-bold mb-4 text-primary">Предпосылки войны</h2>
              
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Globe" size={24} className="text-blue-600" />
                      Восточный вопрос
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      В центре конфликта стоял так называемый "Восточный вопрос" — проблема раздела 
                      владений слабеющей Османской империи. Россия стремилась получить контроль над 
                      черноморскими проливами и усилить влияние на Балканах.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Church" size={24} className="text-amber-600" />
                      Спор о святых местах
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Формальным поводом к войне стал спор между православной и католической церквями 
                      о правах на контроль над христианскими святынями в Палестине, находившейся под 
                      властью Османской империи.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Users" size={24} className="text-purple-600" />
                      Баланс сил в Европе
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Европейские державы — Великобритания и Франция — опасались усиления России 
                      и стремились сохранить баланс сил в регионе. Австрия также проявляла враждебный 
                      нейтралитет по отношению к России.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-l-4 border-l-destructive bg-destructive/5">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-destructive">Ключевые противоречия</h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" size={20} className="text-destructive mt-0.5" />
                      <span>Контроль над Черноморскими проливами</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" size={20} className="text-destructive mt-0.5" />
                      <span>Покровительство христианам в Османской империи</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" size={20} className="text-destructive mt-0.5" />
                      <span>Влияние на Балканах</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="ChevronRight" size={20} className="text-destructive mt-0.5" />
                      <span>Европейский баланс сил</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'progress' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl font-bold mb-4 text-primary">Ход военных действий</h2>
              
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-4">Этапы конфликта</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold text-lg">1853: Начало конфликта</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Российские войска заняли Дунайские княжества. Османская империя объявила войну России.
                      </p>
                    </div>
                    <div className="border-l-4 border-cyan-500 pl-4 py-2">
                      <h4 className="font-semibold text-lg">1854: Вступление союзников</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Англия и Франция вступили в войну на стороне Турции. Высадка войск в Крыму.
                      </p>
                    </div>
                    <div className="border-l-4 border-indigo-500 pl-4 py-2">
                      <h4 className="font-semibold text-lg">1854-1855: Осада Севастополя</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Героическая оборона Севастополя под командованием адмиралов Корнилова, Нахимова и Истомина.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4 py-2">
                      <h4 className="font-semibold text-lg">1856: Окончание войны</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Подписание Парижского мирного договора на невыгодных для России условиях.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="TrendingUp" size={20} className="text-green-600" />
                      Успехи России
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li>• Синопское сражение (1853)</li>
                      <li>• Успешные действия на Кавказе</li>
                      <li>• Оборона Севастополя</li>
                      <li>• Петропавловская оборона</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="TrendingDown" size={20} className="text-red-600" />
                      Поражения и трудности
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li>• Технологическое отставание</li>
                      <li>• Логистические проблемы</li>
                      <li>• Падение Севастополя (1855)</li>
                      <li>• Изоляция на международной арене</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'battles' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl font-bold mb-4 text-primary">Ключевые сражения</h2>
              
              <div className="space-y-4">
                <Card className="border-2 border-blue-200 bg-blue-50/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-semibold">Синопское сражение</h3>
                      <Badge className="bg-blue-600">Победа</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">30 ноября 1853 года</p>
                    <p className="text-foreground/80 leading-relaxed">
                      Последнее крупное сражение эпохи парусного флота. Адмирал П.С. Нахимов разгромил 
                      турецкую эскадру в Синопской бухте. Из 16 турецких кораблей уцелел только один. 
                      Это сражение показало превосходство русских моряков и послужило поводом для 
                      вступления в войну Англии и Франции.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-amber-200 bg-amber-50/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-semibold">Битва на реке Альма</h3>
                      <Badge variant="destructive">Поражение</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">20 сентября 1854 года</p>
                    <p className="text-foreground/80 leading-relaxed">
                      Первое крупное сухопутное сражение в Крыму. Союзные войска численностью 
                      около 60 тысяч человек атаковали русские позиции на реке Альма. Несмотря 
                      на упорное сопротивление, русские войска под командованием князя Меншикова 
                      были вынуждены отступить. Это открыло путь к Севастополю.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-200 bg-red-50/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-semibold">Оборона Севастополя</h3>
                      <Badge className="bg-amber-600">Героическая оборона</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Октябрь 1854 — Август 1855</p>
                    <p className="text-foreground/80 leading-relaxed mb-4">
                      349 дней героической обороны города, ставшей символом мужества русских воинов. 
                      Под руководством адмиралов В.А. Корнилова, П.С. Нахимова, В.И. Истомина и 
                      инженера Э.И. Тотлебена защитники отражали многочисленные штурмы противника.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white rounded p-3 border">
                        <div className="font-semibold text-red-700">6 бомбардировок</div>
                        <div className="text-muted-foreground text-xs">союзников</div>
                      </div>
                      <div className="bg-white rounded p-3 border">
                        <div className="font-semibold text-red-700">~150 000</div>
                        <div className="text-muted-foreground text-xs">снарядов выпущено</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 bg-purple-50/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-semibold">Сражение на Чёрной речке</h3>
                      <Badge variant="destructive">Поражение</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">16 августа 1855 года</p>
                    <p className="text-foreground/80 leading-relaxed">
                      Последняя попытка русских войск снять осаду Севастополя. Генерал Горчаков 
                      атаковал позиции французов и сардинцев на реке Чёрной. Атака была отбита 
                      с большими потерями для русских. После этого поражения судьба Севастополя 
                      была предрешена.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-accent/10 border-accent">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Award" size={24} className="text-accent" />
                    Герои обороны
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-semibold">В.А. Корнилов</p>
                      <p className="text-muted-foreground">Вице-адмирал, руководитель обороны</p>
                    </div>
                    <div>
                      <p className="font-semibold">П.С. Нахимов</p>
                      <p className="text-muted-foreground">Адмирал, герой Синопа</p>
                    </div>
                    <div>
                      <p className="font-semibold">Э.И. Тотлебен</p>
                      <p className="text-muted-foreground">Военный инженер, создатель укреплений</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'results' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl font-bold mb-4 text-primary">Итоги и последствия</h2>
              
              <Card className="bg-gradient-to-br from-slate-50 to-blue-50">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Icon name="FileSignature" size={24} className="text-blue-600" />
                    Парижский мирный договор
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">30 марта 1856 года</p>
                  <p className="text-foreground/80 leading-relaxed mb-4">
                    Мирный договор, подписанный в Париже, зафиксировал поражение России в войне 
                    и существенно ограничил её влияние в Черноморском регионе.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold mb-2">Основные положения:</h4>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <Icon name="Minus" size={16} className="text-red-600 mt-1" />
                        <span>Нейтрализация Чёрного моря (запрет военного флота)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Minus" size={16} className="text-red-600 mt-1" />
                        <span>Отказ от протектората над христианами Османской империи</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Minus" size={16} className="text-red-600 mt-1" />
                        <span>Потеря южной части Бессарабии</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Minus" size={16} className="text-red-600 mt-1" />
                        <span>Отмена ограничений для турецкого флота</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-2 border-red-200">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="TrendingDown" size={20} className="text-red-600" />
                      Негативные последствия
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>Утрата статуса великой державы</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>Экономический кризис</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>Выявление технической отсталости</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>Военные и людские потери</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>Дипломатическая изоляция</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="TrendingUp" size={20} className="text-green-600" />
                      Позитивные последствия
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>Толчок к реформам Александра II</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>Отмена крепостного права (1861)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>Модернизация армии и флота</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>Развитие железных дорог</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>Осознание необходимости перемен</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-4">Историческое значение</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Крымская война обнажила глубокий кризис николаевской системы и показала 
                    необходимость коренных преобразований в России. Поражение стало катализатором 
                    Великих реформ 1860-1870-х годов, которые во многом определили дальнейшее 
                    развитие страны. Война также изменила расстановку сил в Европе и способствовала 
                    формированию новой системы международных отношений.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'conclusion' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl font-bold mb-4 text-primary">Заключение</h2>
              
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="pt-6 space-y-4">
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    Крымская война 1853-1856 годов стала переломным моментом в истории России. 
                    Это был не просто военный конфликт, но столкновение двух эпох — старой, 
                    феодальной России с современными индустриальными державами Западной Европы.
                  </p>
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    Поражение в войне продемонстрировало всю глубину технологической и социальной 
                    отсталости Российской империи. Николай I, не переживший этого поражения, 
                    оставил своему преемнику Александру II страну, остро нуждавшуюся в реформах.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardContent className="pt-6">
                  <blockquote className="text-2xl italic text-foreground/80 mb-4">
                    "Севастополь не сдался противнику, он измучил его..."
                  </blockquote>
                  <p className="text-sm text-muted-foreground">— Л.Н. Толстой, "Севастопольские рассказы"</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-4">Уроки истории</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Icon name="Check" size={20} className="text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold">Необходимость модернизации</p>
                        <p className="text-sm text-muted-foreground">
                          Война показала критическую важность технологического развития и модернизации армии
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Icon name="Check" size={20} className="text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold">Значение союзников</p>
                        <p className="text-sm text-muted-foreground">
                          Дипломатическая изоляция России сыграла решающую роль в исходе конфликта
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Icon name="Check" size={20} className="text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold">Героизм защитников</p>
                        <p className="text-sm text-muted-foreground">
                          Оборона Севастополя продемонстрировала мужество и стойкость русского народа
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-3">Память о войне</h3>
                  <p className="leading-relaxed opacity-90">
                    События Крымской войны навсегда остались в исторической памяти народов. 
                    Героическая оборона Севастополя стала символом доблести и самопожертвования. 
                    Уроки этой войны способствовали глубоким преобразованиям в России и изменению 
                    всей системы международных отношений в Европе.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <Separator className="my-12" />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold text-primary">Временная шкала событий</h2>
              <div className="flex gap-2">
                {['1853', '1854', '1855', '1856'].map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      selectedYear === year
                        ? 'bg-accent text-accent-foreground shadow-md'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
              <div className="space-y-6">
                {filteredEvents.map((event, index) => (
                  <div key={index} className="relative pl-12 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className={`absolute left-0 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center ${getEventColor(event.type).split(' ')[0]}`}>
                      <div className="w-3 h-3 rounded-full bg-current"></div>
                    </div>
                    <Card className={`${getEventColor(event.type)} border-2`}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{event.title}</h3>
                            <p className="text-sm opacity-80">{event.date}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {event.type === 'battle' && 'Сражение'}
                            {event.type === 'diplomatic' && 'Дипломатия'}
                            {event.type === 'naval' && 'Флот'}
                            {event.type === 'other' && 'Событие'}
                          </Badge>
                        </div>
                        <p className="text-sm leading-relaxed">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Исторический проект © {new Date().getFullYear()}</p>
          <p className="mt-1">Николай I • Крымская война 1853-1856 годов</p>
        </div>
      </footer>
    </div>
  );
}
