<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class DictionaryController extends Controller
{
    public function search(Request $request): JsonResponse
    {
        $word = $request->query('word');
        
        if (!$word || strlen($word) < 2) {
            return response()->json(['error' => 'Word must be at least 2 characters'], 400);
        }

        try {
            $response = Http::timeout(10)
                ->get("https://api.dictionaryapi.dev/api/v2/entries/en/" . urlencode($word));
            
            if ($response->failed()) {
                return response()->json([
                    'error' => 'Word not found',
                    'status' => $response->status()
                ], 404);
            }

            return response()->json($response->json());
        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            \Log::error('Dictionary API Connection Error: ' . $e->getMessage());
            return response()->json(['error' => 'Network error - could not reach dictionary service'], 500);
        } catch (\Exception $e) {
            \Log::error('Dictionary Search Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}