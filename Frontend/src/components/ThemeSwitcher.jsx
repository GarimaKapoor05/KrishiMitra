import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { themeName, setThemeName } = useTheme(); // ✅ FIX

  const themes = [
    { id: "light", name: "Light", icon: Sun },
    { id: "dark", name: "Dark", icon: Moon }
  ];

  return (
    <Menu as="div" className="relative">
      <MenuButton
        className="
          flex items-center justify-center
          w-10 h-10
          rounded-xl
          border
          border-gray-300
          dark:border-gray-700
          colorblind:border-black
          bg-white
          dark:bg-gray-900
          hover:bg-gray-100
          dark:hover:bg-gray-800
          transition
        "
      >
        <Sun className="w-5 h-5 dark:hidden text-gray-700" />
        <Moon className="hidden dark:block w-5 h-5 text-gray-200" />
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="
          mt-2
          w-64
          rounded-2xl
          bg-white
          dark:bg-gray-900
          border
          border-gray-200
          dark:border-gray-700
          shadow-xl
          focus:outline-none
          p-2
          z-50
        "
      >
        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Appearance
          </p>
          <p className="text-xs text-gray-500">
            Choose your preferred theme
          </p>
        </div>

        <div className="mt-2 space-y-1">
          {themes.map((item) => {
            const Icon = item.icon;

            return (
              <MenuItem key={item.id}>
                <button
                  onClick={() => setThemeName(item.id)} // ✅ FIX
                  className={`
                    w-full flex items-center justify-between rounded-xl px-3 py-3 transition
                    ${
                      themeName === item.id
                        ? "bg-emerald-100 dark:bg-emerald-900"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-emerald-600" />

                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {themeName === item.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  )}
                </button>
              </MenuItem>
            );
          })}
        </div>
      </MenuItems>
    </Menu>
  );
}