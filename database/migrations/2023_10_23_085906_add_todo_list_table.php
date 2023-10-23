<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTodoListTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todo_lists', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255)->nullable();
            $table->text('description');
            $table->boolean('is_complete')->nullable();
            $table->timestamps();
            $table->softDeletes($column = 'deleted_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todo_lists');
    }
}
