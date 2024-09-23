'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Settings,
  Sun,
  Moon,
  Download,
  Upload,
  Keyboard,
  MessageSquare,
} from 'lucide-react';
import { SiX } from 'react-icons/si';
import { useOs, useHotkeys } from '@mantine/hooks';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

import { KeyboardShortcuts } from '@/components/modals/keyboard-shortcuts';

export const SettingsMenu = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useHotkeys([['alt+t', toggleTheme]]);

  const os = useOs();
  const isMac = os === 'macos' || os === 'ios';

  const [isKeyboardShortcutsModalOpen, setIsKeyboardShortcutsModalOpen] =
    useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <Settings className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" sideOffset={10}>
          <DropdownMenuLabel>Subtrackt</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={toggleTheme}>
              {theme === 'light' ? (
                <Sun className="size-4 mr-2" />
              ) : (
                <Moon className="size-4 mr-2" />
              )}
              <span>Toggle theme</span>
              <DropdownMenuShortcut>
                {isMac ? '⌥T' : 'Alt+T'}
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsKeyboardShortcutsModalOpen(true)}
            >
              <Keyboard className="size-4 mr-2" />
              <span>Keyboard shortcuts</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Upload className="size-4 mr-2" />
              <span>Import data</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="size-4 mr-2" />
              <span>Export data</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SiX className="size-3 mr-2" />
            <span>Share it on X</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquare className="size-3 mr-2" />
            <span>Feedback / requests</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <KeyboardShortcuts
        open={isKeyboardShortcutsModalOpen}
        setOpen={setIsKeyboardShortcutsModalOpen}
      />
    </>
  );
};
