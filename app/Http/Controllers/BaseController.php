<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class BaseController extends Controller
{
    public function sendResponse($result, $message = 'Success'): JsonResponse
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }

    public function sendError($error, $errorMessages = [], $code = 404): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if (! empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

    public function deleteError($result = null, $error = 'Delete Failed', $errorMessages = [], $code = 409): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $error,
            'data'    => $result,
        ];

        if (! empty($errorMessages)) {
            $response['error_details'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

    public function sendValidationError($errors, $message = 'Validation Error'): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $message,
            'errors'  => $errors, 
        ];

        return response()->json($response, 422);
    }
}
