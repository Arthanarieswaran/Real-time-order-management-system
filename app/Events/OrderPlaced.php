<?php
namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderPlaced implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    public $order;

    public function __construct($order)
    {
        $this->order = $order->load('product');
    }

    public function broadcastOn(): array
    {
        return ['orders'];
    }

    public function broadcastAs()
    {
        return 'order.placed';
    }
}
