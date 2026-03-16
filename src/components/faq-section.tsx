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
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react';

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

  React.useEffect(() => {
    if (searchQuery.trim()) {
      handleExpandAll();
    } else {
      handleCollapseAll();
    }
  }, [searchQuery, handleExpandAll, handleCollapseAll]);

  const hasSearch = searchQuery.trim().length > 0;

  return (
    <section id="faq" className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-[#120E2F] text-3xl md:text-5xl font-extrabold tracking-tight">
            {title}
          </h2>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-10"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-3 text-sm rounded-lg border-neutral-200 bg-neutral-50 focus-visible:ring-neutral-900 focus-visible:ring-1 focus-visible:border-neutral-900"
            />
            {hasSearch && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-neutral-200 transition-colors"
              >
                <X className="h-3.5 w-3.5 text-neutral-400" />
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
              className="flex items-center justify-between mb-6"
            >
              <p className="text-sm text-neutral-500">
                {filteredCount === 0
                  ? noResults
                  : searchResults.replace('{{count}}', String(filteredCount))}
              </p>
              {filteredCount === 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="text-neutral-900 hover:text-neutral-600"
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
            className="flex justify-end mb-6"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={isAllExpanded ? handleCollapseAll : handleExpandAll}
              className="text-sm text-neutral-500 hover:text-neutral-900"
            >
              {isAllExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1.5" />
                  {collapseAll}
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1.5" />
                  {expandAll}
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* FAQ Groups */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                layout
              >
                {/* Category Header - Minimal */}
                <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                  {categories[group.category]}
                </h3>

                {/* Items */}
                <div className="border-t border-neutral-200">
                  <Accordion
                    type="multiple"
                    value={openItems}
                    onValueChange={setOpenItems}
                    className="w-full"
                  >
                    {group.items.map((item, itemIndex) => {
                      const itemId = `${group.category}-${itemIndex}`;

                      return (
                        <AccordionItem
                          key={itemId}
                          value={itemId}
                          className="border-b border-neutral-200 last:border-b-0"
                        >
                          <AccordionTrigger
                            onClick={() => handleToggleItem(itemId)}
                            className="cursor-pointer py-5 text-left hover:no-underline group"
                          >
                            <span className="text-lg font-semibold text-[#120E2F] group-hover:text-[#120E2F]/80 transition-colors pr-4">
                              {item.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-5">
                            <p className="text-base text-neutral-600 leading-relaxed pr-4">
                              {item.answer}
                            </p>
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
              <p className="text-neutral-500 mb-4">{noResults}</p>
              <Button variant="outline" onClick={handleClearSearch}>
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
            className="mt-16 pt-8 border-t border-neutral-200 text-center"
          >
            <p className="text-xs text-neutral-400">
              {totalCount} questions • {groups.length} categories
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
