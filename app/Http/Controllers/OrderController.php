<?php
namespace App\Http\Controllers;

use Validator;
use App\Models\Order;
use App\Events\OrderPlaced;
use Illuminate\Http\Request;
use App\Events\OrderStatusUpdated;
use App\Http\Controllers\BaseController;

class OrderController extends BaseController
{
    public function index()
    {
        $order = Order::with('product')->get();

        return $this->sendResponse($order, 'Order details retrieved successfully.');

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id'    => 'integer',
            'product_id' => 'required|integer|exists:products,id',
            'quantity'   => 'required|integer|min:1',
            'status'     => 'in:pending,processing,shipped,delivered,cancelled',
        ]);

        if ($validator->fails()) {
            return $this->sendValidationError($validator->errors());
        }

        $order = Order::create([
            'user_id'    => $request->user_id ?? 1,
            'product_id' => $request->product_id,
            'quantity'   => $request->quantity,
            'status'     => $request->status ?? 'pending',
        ]);

        $order = Order::with('product')->find($order->id);
        event(new OrderPlaced($order));

        return $this->sendResponse($order, 'Order has been created successfully.');

    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order = Order::with('product')->findOrFail($id);
        $order->update(['status' => $request->status]);

        event(new OrderStatusUpdated($order));

        return $this->sendResponse($order, 'Order status updated');
    }

}
