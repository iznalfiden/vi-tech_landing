'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Settings,
  Lightbulb,
  ClipboardCheck,
  Users,
  X,
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQGroup {
  category: string;
  items: FAQItem[];
}

interface FAQSectionProps {
  title: string;
  searchPlaceholder: string;
  searchResults: string;
  noResults: string;
  clearSearch: string;
  expandAll: string;
  collapseAll: string;
  categories: Record<string, string>;
  groups: FAQGroup[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  general: <HelpCircle className="h-5 w-5" />,
  products: <Settings className="h-5 w-5" />,
  problemSolving: <Lightbulb className="h-5 w-5" />,
  audits: <ClipboardCheck className="h-5 w-5" />,
  operations: <Users className="h-5 w-5" />,
};

const categoryColors: Record<string, string> = {
  general: 'bg-blue-50 text-blue-700 border-blue-200',
  products: 'bg-purple-50 text-purple-700 border-purple-200',
  problemSolving: 'bg-amber-50 text-amber-700 border-amber-200',
  audits: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  operations: 'bg-rose-50 text-rose-700 border-rose-200',
};

const categoryDotColors: Record<string, string> = {
  general: 'bg-blue-500',
  products: 'bg-purple-500',
  problemSolving: 'bg-amber-500',
  audits: 'bg-emerald-500',
  operations: 'bg-rose-500',
};

export default function FAQSection({
  title,
  searchPlaceholder,
  searchResults,
  noResults,
  clearSearch,
  expandAll,
  collapseAll,
  categories,
  groups,
}: FAQSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  // Filter items based on search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groups;

    const query = searchQuery.toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, searchQuery]);

  const filteredCount = useMemo(() => {
    return filteredGroups.reduce((sum, group) => sum + group.items.length, 0);
  }, [filteredGroups]);

  const totalCount = useMemo(() => {
    return groups.reduce((sum, group) => sum + group.items.length, 0);
  }, [groups]);

  // Get all item IDs for expand/collapse functionality
  const getAllItemIds = useCallback(() => {
    const ids: string[] = [];
    filteredGroups.forEach((group, groupIndex) => {
      group.items.forEach((_, itemIndex) => {
        ids.push(`${group.category}-${groupIndex}-${itemIndex}`);
      });
    });
    return ids;
  }, [filteredGroups]);

  const handleExpandAll = useCallback(() => {
    setOpenItems(getAllItemIds());
    setIsAllExpanded(true);
  }, [getAllItemIds]);

  const handleCollapseAll = useCallback(() => {
    setOpenItems([]);
    setIsAllExpanded(false);
  }, []);

  const handleToggleItem = useCallback((value: string) => {
    setOpenItems((prev) => {
      const newItems = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      return newItems;
    });
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setOpenItems([]);
  }, []);

  // Auto-expand when searching
  React.useEffect(() => {
    if (searchQuery.trim()) {
      handleExpandAll();
    } else {
      handleCollapseAll();
    }
  }, [searchQuery, handleExpandAll, handleCollapseAll]);

  const hasSearch = searchQuery.trim().length > 0;

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-neutral-50/50 to-white py-16 md:py-24"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_800px_at_80%_0%,rgba(139,92,246,0.06),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_600px_at_0%_100%,rgba(37,99,235,0.04),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-5xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#120E2F]/5 px-4 py-1.5 mb-4">
            <HelpCircle className="h-4 w-4 text-[#120E2F]" />
            <span className="text-sm font-medium text-[#120E2F]">Support Center</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#120E2F] tracking-tight">
            {title}
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Find answers to common questions about Vi-Tech platform, features, and implementation.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="relative max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 py-6 text-base rounded-2xl border-neutral-200 bg-white shadow-sm focus-visible:ring-[#120E2F] focus-visible:ring-offset-2"
            />
            {hasSearch && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="h-4 w-4 text-neutral-400" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Search Results Info */}
        <AnimatePresence mode="wait">
          {hasSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between max-w-2xl mx-auto mb-6"
            >
              <p className="text-sm text-neutral-600">
                {filteredCount === 0
                  ? noResults
                  : searchResults.replace('{{count}}', String(filteredCount))}
              </p>
              {filteredCount === 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="text-[#120E2F] hover:text-[#120E2F]/80"
                >
                  {clearSearch}
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        {!hasSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end gap-2 mb-6"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={isAllExpanded ? handleCollapseAll : handleExpandAll}
              className="text-sm rounded-full border-neutral-200 hover:bg-neutral-100"
            >
              {isAllExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  {collapseAll}
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  {expandAll}
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* FAQ Groups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: groupIndex * 0.05 }}
                layout
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${categoryColors[group.category]}`}
                  >
                    {categoryIcons[group.category]}
                    <span>{categories[group.category]}</span>
                  </div>
                  <div className={`h-px flex-1 ${categoryDotColors[group.category].replace('bg-', 'bg-opacity-20 bg-')}`} />
                </div>

                {/* Items */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                  <Accordion
                    type="multiple"
                    value={openItems}
                    onValueChange={setOpenItems}
                    className="w-full"
                  >
                    {group.items.map((item, itemIndex) => {
                      const itemId = `${group.category}-${groupIndex}-${itemIndex}`;
                      const isOpen = openItems.includes(itemId);

                      return (
                        <AccordionItem
                          key={itemId}
                          value={itemId}
                          className="border-b border-neutral-100 last:border-b-0"
                        >
                          <AccordionTrigger
                            onClick={() => handleToggleItem(itemId)}
                            className="px-6 py-5 text-left hover:no-underline group"
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`mt-1 h-2 w-2 rounded-full shrink-0 transition-colors ${categoryDotColors[group.category]} ${isOpen ? 'opacity-100' : 'opacity-40'}`}
                              />
                              <span className="text-base md:text-lg font-semibold text-[#120E2F] group-hover:text-[#120E2F]/80 transition-colors leading-snug">
                                {item.question}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-5">
                            <div className="pl-6 border-l-2 border-neutral-200">
                              <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredGroups.length === 0 && hasSearch && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
                <Search className="h-8 w-8 text-neutral-400" />
              </div>
              <p className="text-lg font-medium text-neutral-900 mb-2">{noResults}</p>
              <Button
                variant="outline"
                onClick={handleClearSearch}
                className="rounded-full mt-2"
              >
                {clearSearch}
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom Stats */}
        {!hasSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-neutral-500">
              Showing {totalCount} questions across {groups.length} categories
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
