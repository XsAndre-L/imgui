import {
    BuildType,
    HeaderList,
    OUTPUT_DIR,
} from "../../../src/types/package-config.ts";
import { runPackageAction } from "../../../src/packages.ts";

import { resolve } from "node:path";
import { argv } from "node:process";

export const build = (cwd: string = process.cwd()): BuildType => {
    const INSTALL_DIR = resolve(cwd, OUTPUT_DIR);
    const IMGUI_INSTALL = resolve(INSTALL_DIR, "imgui");
    const INCLUDE_DIR = resolve(IMGUI_INSTALL, "include");
    const OPTIONS_DIR = resolve(IMGUI_INSTALL, "options", "backends");

    const VULKAN_BACKEND = resolve(OPTIONS_DIR, "Vulkan");
    const OPENGL_BACKEND = resolve(OPTIONS_DIR, "OpenGL3");
    const GLFW_BACKEND = resolve(OPTIONS_DIR, "GLFW");
    const DX11_BACKEND = resolve(OPTIONS_DIR, "DX11");
    const DX12_BACKEND = resolve(OPTIONS_DIR, "DX12");
    const SDL_BACKEND = resolve(OPTIONS_DIR, "SDL3");
    const ANDROID_BACKEND = resolve(OPTIONS_DIR, "Android");
    const WEBGPU_BACKEND = resolve(OPTIONS_DIR, "WebGPU");

    // Shipped Backends

    const imgui: HeaderList = {
        type: "headers",
        libs: {
            [IMGUI_INSTALL]: [".codeframe/lib.json"],
            [INCLUDE_DIR]: [
                "imconfig.h",
                "imgui_demo.cpp",
                "imgui_draw.cpp",
                "imgui_internal.h",
                "imgui_tables.cpp",
                "imgui_widgets.cpp",
                "imgui.cpp",
                "imgui.h",
                "imstb_rectpack.h",
                "imstb_textedit.h",
                "imstb_truetype.h",
            ],
            [VULKAN_BACKEND]: [
                "backends/vulkan",
                "backends/imgui_impl_vulkan.h",
                "backends/imgui_impl_vulkan.cpp",
            ],
            [OPENGL_BACKEND]: [
                "backends/imgui_impl_opengl3_loader.h",
                "backends/imgui_impl_opengl3.cpp",
                "backends/imgui_impl_opengl3.h",
            ],
            [GLFW_BACKEND]: [
                "backends/imgui_impl_glfw.cpp",
                "backends/imgui_impl_glfw.h",
            ],
            [DX12_BACKEND]: [
                "backends/imgui_impl_dx12.cpp",
                "backends/imgui_impl_dx12.h",
            ],
            [SDL_BACKEND]: [
                "backends/imgui_impl_sdl3.cpp",
                "backends/imgui_impl_sdl3.h",
            ],
            [ANDROID_BACKEND]: [
                "backends/imgui_impl_android.cpp",
                "backends/imgui_impl_android.h",
            ],
            [DX11_BACKEND]: [
                "backends/imgui_impl_dx11.cpp",
                "backends/imgui_impl_dx11.h",
            ],
            [WEBGPU_BACKEND]: [
                "backends/imgui_impl_wgpu.cpp",
                "backends/imgui_impl_wgpu.h",
            ],
        },
    };

    return imgui satisfies BuildType;
};

const args = argv.slice(2);
const [action = "help"] = args;

await runPackageAction(action, process.cwd(), build());
