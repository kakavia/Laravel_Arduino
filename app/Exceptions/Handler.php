<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof ModelNotFoundException) {
            if($request->expectsJson()){
            return response()->json([
                __('messages.error') => __('messages.content_not_found')
            ], 404);
            }
        }
        if($exception instanceof AuthenticationException){
            if($request->expectsJson()){
                return response()->json([
                    __('messages.error') => __('messages.unauthorized')
                ], 401);
            }
        }
        if($exception instanceof NotFoundHttpException){
        if($request->expectsJson()){
            return response()->json([
                __('messages.error') => __('messages.page_not_found')
            ], 404);
        }
    }
        return parent::render($request, $exception);
    }
}
